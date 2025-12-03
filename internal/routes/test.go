package routes

import (
	"app/internal/handler"

	"github.com/gin-gonic/gin"
)

func TestRoutes(rg *gin.RouterGroup) {
	UsersRoute := rg.Group("/test")
	{
		UsersRoute.GET("/hash/:text", handler.GetHashFromParams)
		UsersRoute.GET("/hello", handler.HelloWorld)
	}
}
