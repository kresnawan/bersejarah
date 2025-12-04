package routes

import (
	"app/internal/handler"

	"github.com/gin-gonic/gin"
)

func UploadsRoute(rg *gin.RouterGroup) {
	Route := rg.Group("/uploads")
	{
		Route.GET("/:id", handler.SendPhoto)
	}
}
