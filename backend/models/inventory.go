package models

type Inventory struct {
	ID          uint    `gorm:"primaryKey;autoIncrement"`
	Name        string  `json:"name" gorm:"not null"`
	Description string  `json:"description"`
	Price       float64 `json:"price" gorm:"not null"`
	Quantity    int     `json:"quantity" gorm:"not null"`
}
