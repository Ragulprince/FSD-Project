package main

import (
	"log"
	"os"
	"sample-go/config"
	"sample-go/models"
	"sample-go/routes"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found.")
	}

	config.ConnectDatabase()

	err := config.DB.AutoMigrate(&models.Inventory{}, &models.Orders{}, &models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database schema: %v", err)
	}
	// seedDatabase()
	// log.Println("Database migration completed successfully.")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000,https://your-react-app-domain.com",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Content-Type,Authorization",
	}))

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	log.Fatal(app.Listen(":" + port))
}

func seedDatabase() {
	users := []models.User{
		{Name: "John Doe", Email: "john.doe@example.com"},
		{Name: "Jane Doe", Email: "jane.doe@example.com"},
	}

	for _, user := range users {
		if err := config.DB.Create(&user).Error; err != nil {
			log.Printf("Error creating user: %v", err)
		}
	}

	inventories := []models.Inventory{
		{Name: "Laptop", Quantity: 20, Price: 1000.00},
		{Name: "Smartphone", Quantity: 50, Price: 500.00},
		{Name: "Headphones", Quantity: 100, Price: 100.00},
	}

	for _, inventory := range inventories {
		if err := config.DB.Create(&inventory).Error; err != nil {
			log.Printf("Error creating inventory: %v", err)
		}
	}

	orders := []models.Orders{
		{
			CustomerID:  1,
			OrderDate:   time.Now(),
			InventoryID: 1,
			Quantity:    2,
			TotalAmount: 2000.00,
			OrderStatus: "Pending",
		},
		{
			CustomerID:  2,
			OrderDate:   time.Now(),
			InventoryID: 2,
			Quantity:    1,
			TotalAmount: 500.00,
			OrderStatus: "Completed",
		},
		{
			CustomerID:  3,
			OrderDate:   time.Now(),
			InventoryID: 3,
			Quantity:    3,
			TotalAmount: 300.00,
			OrderStatus: "Shipped",
		},
	}

	for _, order := range orders {
		if err := config.DB.Create(&order).Error; err != nil {
			log.Printf("Error creating order: %v", err)
		}
	}

	log.Println("Database seeding completed successfully!")
}
