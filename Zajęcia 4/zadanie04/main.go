package main

import (
	"zadanie04/database"
	"zadanie04/handlers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	database.Connect()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	productHandler := handlers.NewProductHandler()
	cartHandler := handlers.NewCartHandler()
	categoryHandler := handlers.NewCategoryHandler()

	e.GET("/products", productHandler.GetAll)
	e.GET("/products/:id", productHandler.GetByID)
	e.POST("/products", productHandler.Create)
	e.PUT("/products/:id", productHandler.Update)
	e.DELETE("/products/:id", productHandler.Delete)

	e.POST("/carts", cartHandler.Create)
	e.GET("/carts/:id", cartHandler.GetByID)
	e.POST("/carts/:id/items", cartHandler.AddItem)

	e.GET("/categories", categoryHandler.GetAll)
	e.GET("/categories/:id", categoryHandler.GetByID)
	e.POST("/categories", categoryHandler.Create)

	e.Logger.Fatal(e.Start(":8080"))
}
