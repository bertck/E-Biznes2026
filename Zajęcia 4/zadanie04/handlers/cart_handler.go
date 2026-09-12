package handlers

import (
	"net/http"
	"strconv"

	"zadanie04/database"
	"zadanie04/models"

	"github.com/labstack/echo/v4"
)

type CartHandler struct{}

func NewCartHandler() *CartHandler {
	return &CartHandler{}
}

// POST /carts
func (h *CartHandler) Create(c echo.Context) error {
	cart := models.Cart{}
	database.DB.Create(&cart)
	return c.JSON(http.StatusCreated, cart)
}

// GET /carts/:id
func (h *CartHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	var cart models.Cart
	result := database.DB.Preload("Items.Product").First(&cart, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "koszyk nie znaleziony"})
	}

	return c.JSON(http.StatusOK, cart)
}

// POST /carts/:id/items
func (h *CartHandler) AddItem(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id koszyka"})
	}

	var cart models.Cart
	if result := database.DB.First(&cart, cartID); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "koszyk nie znaleziony"})
	}

	var input struct {
		ProductID uint `json:"product_id"`
		Quantity  int  `json:"quantity"`
	}
	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne dane"})
	}

	var product models.Product
	if result := database.DB.First(&product, input.ProductID); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
	}

	item := models.CartItem{
		CartID:    uint(cartID),
		ProductID: input.ProductID,
		Quantity:  input.Quantity,
	}
	database.DB.Create(&item)

	return c.JSON(http.StatusCreated, item)
}
