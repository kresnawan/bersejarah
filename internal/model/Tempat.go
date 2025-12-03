package model

type Tempat struct {
	Id          int64   `json:"id"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Photo       string  `json:"photo"`
}
