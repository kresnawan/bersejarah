package handler

import (
	"github.com/gin-gonic/gin"
)

func SendPhoto(c *gin.Context) {
	id := c.Param("id")
	filePath := "uploads/" + id

	c.File(filePath)
}
