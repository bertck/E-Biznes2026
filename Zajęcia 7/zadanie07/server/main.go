package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type Payment struct {
	ProductID int     `json:"productId"`
	Amount    float64 `json:"amount"`
	CardName  string  `json:"cardName"`
}

var products = []Product{
	{ID: 1, Name: "Klawiatura", Price: 149.99},
	{ID: 2, Name: "Myszka", Price: 79.99},
	{ID: 3, Name: "Monitor", Price: 899.00},
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func isValidPayment(p Payment) bool {
	if p.Amount <= 0 {
		return false
	}
	if p.CardName == "" {
		return false
	}
	return true
}

func findProductByID(id int) (Product, bool) {
	for _, p := range products {
		if p.ID == id {
			return p, true
		}
	}
	return Product{}, false
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == http.MethodOptions {
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func paymentsHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var payment Payment
	if err := json.NewDecoder(r.Body).Decode(&payment); err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	if !isValidPayment(payment) {
		http.Error(w, "Invalid payment data", http.StatusBadRequest)
		return
	}

	fmt.Printf("Received payment: CardName=%s Amount=%.2f ProductID=%d\n",
		strconv.Quote(payment.CardName), payment.Amount, payment.ProductID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func main() {
	http.HandleFunc("/products", productsHandler)
	http.HandleFunc("/payments", paymentsHandler)

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
