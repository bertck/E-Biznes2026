package handlers

import (
	"net/http"
	"strconv"

	"zadanie04/models"

	"github.com/labstack/echo/v4"
)

type ProductHandler struct {
	products []models.Product
	nextID   int
}

func NewProductHandler() *ProductHandler {
	return &ProductHandler{
		products: []models.Product{},
		nextID:   1,
	}
}

// GET /products
func (h *ProductHandler) GetAll(c echo.Context) error {
	return c.JSON(http.StatusOK, h.products)
}

// GET /products/:id
func (h *ProductHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	for _, p := range h.products {
		if p.ID == id {
			return c.JSON(http.StatusOK, p)
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
}

// POST /products
func (h *ProductHandler) Create(c echo.Context) error {
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne dane"})
	}

	product.ID = h.nextID
	h.nextID++
	h.products = append(h.products, product)

	return c.JSON(http.StatusCreated, product)
}

// PUT /products/:id
func (h *ProductHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	var updated models.Product
	if err := c.Bind(&updated); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne dane"})
	}

	for i, p := range h.products {
		if p.ID == id {
			updated.ID = id
			h.products[i] = updated
			return c.JSON(http.StatusOK, updated)
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
}

// DELETE /products/:id
func (h *ProductHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	for i, p := range h.products {
		if p.ID == id {
			h.products = append(h.products[:i], h.products[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
}
