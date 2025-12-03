package routes

import (
	"app/internal/handler"

	"github.com/gin-gonic/gin"
)

func UsersRoutes(rg *gin.RouterGroup) {
	UsersRoute := rg.Group("/users")
	{
		UsersRoute.GET("/", handler.GetAllUsers)
	}
}
