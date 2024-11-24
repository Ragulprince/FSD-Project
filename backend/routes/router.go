package routes

import (
	"sample-go/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/")
	api.Get("/get_orders", controllers.GetOrders)
	api.Post("/get_order", controllers.GetOrderByID)
	api.Post("/get_order_date", controllers.GetOrdersByDate)
	api.Get("/get_invs", controllers.GetInventories)
	api.Post("/get_inv", controllers.GetInventoriesByID)
	api.Get("/dashboard-stats", controllers.GetDashboardStats)
}
