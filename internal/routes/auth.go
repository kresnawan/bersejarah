package routes

import (
	"app/internal/handler"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(rg *gin.RouterGroup) {
	UsersRoute := rg.Group("/auth")
	{
		UsersRoute.POST("/login", handler.Login)
		UsersRoute.POST("/register", handler.Register)
	}
}
