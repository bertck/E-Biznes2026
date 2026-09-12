package main

import (
	"zadanie04/handlers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	productHandler := handlers.NewProductHandler()

	e.GET("/products", productHandler.GetAll)
	e.GET("/products/:id", productHandler.GetByID)
	e.POST("/products", productHandler.Create)
	e.PUT("/products/:id", productHandler.Update)
	e.DELETE("/products/:id", productHandler.Delete)

	e.Logger.Fatal(e.Start(":8080"))
}
