package database

import (
	"log"

	"zadanie04/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(sqlite.Open("sklep.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("nie udalo sie polaczyc z baza danych: ", err)
	}

	err = db.AutoMigrate(&models.Category{}, &models.Product{}, &models.Cart{}, &models.CartItem{})
	if err != nil {
		log.Fatal("nie udalo sie wykonac migracji: ", err)
	}

	DB = db
}
