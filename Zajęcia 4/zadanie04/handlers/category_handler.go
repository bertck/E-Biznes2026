package handlers

import (
	"net/http"
	"strconv"

	"zadanie04/database"
	"zadanie04/models"

	"github.com/labstack/echo/v4"
)

type CategoryHandler struct{}

func NewCategoryHandler() *CategoryHandler {
	return &CategoryHandler{}
}

// GET /categories
func (h *CategoryHandler) GetAll(c echo.Context) error {
	var categories []models.Category
	database.DB.Find(&categories)
	return c.JSON(http.StatusOK, categories)
}

// GET /categories/:id
func (h *CategoryHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne id"})
	}

	var category models.Category
	result := database.DB.Preload("Products").First(&category, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "kategoria nie znaleziona"})
	}

	return c.JSON(http.StatusOK, category)
}

// POST /categories
func (h *CategoryHandler) Create(c echo.Context) error {
	var category models.Category
	if err := c.Bind(&category); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "niepoprawne dane"})
	}

	database.DB.Create(&category)
	return c.JSON(http.StatusCreated, category)
}
