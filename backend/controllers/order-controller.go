package controllers

import (
	"sample-go/config"
	"sample-go/models"
	"time"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func GetOrders(c *fiber.Ctx) error {
	var orders []models.Orders

	if err := config.DB.
		Preload("User").
		Preload("Inventory").
		Find(&orders).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve orders",
		})
	}
	fmt.Println(orders)
	return c.JSON(orders)
}

func GetInventories(c *fiber.Ctx) error {
	var invs []models.Inventory
	config.DB.Find(&invs)
	fmt.Println(invs)
	return c.JSON(invs)
}

func GetOrderByID(c *fiber.Ctx) error {
	var order models.Orders

	var request struct {
		ID uint `json:"id"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if err := config.DB.
		Preload("User").
		Preload("Inventory").
		First(&order, request.ID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Order not found",
		})
	}
	fmt.Println(order)
	return c.JSON(order)
}

type InventoryRequest struct {
	ID uint `json:"id"`
}

func GetInventoriesByID(c *fiber.Ctx) error {
	var request InventoryRequest

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	var inv models.Inventory
	if err := config.DB.First(&inv, request.ID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Order not found",
		})
	}

	return c.JSON(inv)
}

func GetOrdersByDate(c *fiber.Ctx) error {
	orderDateStr := c.FormValue("order_date")

	if orderDateStr == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "order_date is required",
		})
	}

	orderDate, err := time.Parse("2006-01-02", orderDateStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":  "Invalid date format, use yyyy-mm-dd",
			"detail": err.Error(), // Include the error message for debugging
		})
	}

	var orders []models.Orders
	if err := config.DB.
		Preload("User").
		Preload("Inventory").
		Where("order_date = ?", orderDate).
		Find(&orders).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve orders",
		})
	}

	return c.JSON(orders)
}
