package main

import (
	"app/internal/routes"
	"app/internal/storage"
)

func main() {

	routes.RouterInit()
	defer storage.Db.Close()
}
