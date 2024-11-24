package models

import "time"

type Orders struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	CustomerID  int       `json:"customer_id" gorm:"not null"`
	OrderDate   time.Time `json:"order_date" gorm:"not null"`
	InventoryID uint      `json:"inventory_id" gorm:"not null"`
	Quantity    int       `json:"quantity" gorm:"not null"`
	TotalAmount float64   `json:"total_amount"`
	OrderStatus string    `json:"order_status" gorm:"not null"`

	User      User      `gorm:"foreignKey:CustomerID"`
	Inventory Inventory `gorm:"foreignKey:InventoryID"`
}
