package routes

import (
	"app/internal/handler"

	"github.com/gin-gonic/gin"
)

func DataTempatRoutes(rg *gin.RouterGroup) {
	UsersRoute := rg.Group("/data")
	{
		UsersRoute.POST("", handler.AddDataTempat)
		UsersRoute.POST("/upload", handler.UploadFoto)
		UsersRoute.GET("", handler.GetAllDataTempat)
		UsersRoute.GET("/:id", handler.GetTempatByID)
		UsersRoute.GET("/:id/foto", handler.GetFotoByID)
		UsersRoute.DELETE("/:id", handler.DeleteDataTempat)
		UsersRoute.POST("/:id/update", handler.UpdateDataTempat)
	}
}
