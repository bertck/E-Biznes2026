package handlers

import (
	"net/http"
	"strconv"

	"zadanie04/database"
	"zadanie04/models"

	"github.com/labstack/echo/v4"
)

type ProductHandler struct{}

func NewProductHandler() *ProductHandler {
	return &ProductHandler{}
}

// GET /products
func (h *ProductHandler) GetAll(c echo.Context) error {
	var products []models.Product
	database.DB.Preload("Category").Find(&products)
	return c.JSON(http.StatusOK, products)
}

// GET /products/:id
func (h *ProductHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	var product models.Product
	result := database.DB.Preload("Category").First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
	}

	return c.JSON(http.StatusOK, product)
}

// POST /products
func (h *ProductHandler) Create(c echo.Context) error {
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne dane"})
	}

	database.DB.Create(&product)
	return c.JSON(http.StatusCreated, product)
}

// PUT /products/:id
func (h *ProductHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	var product models.Product
	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
	}

	var updated models.Product
	if err := c.Bind(&updated); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne dane"})
	}

	product.Name = updated.Name
	product.Price = updated.Price
	database.DB.Save(&product)

	return c.JSON(http.StatusOK, product)
}

// DELETE /products/:id
func (h *ProductHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	var product models.Product
	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "produkt nie znaleziony"})
	}

	database.DB.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}
