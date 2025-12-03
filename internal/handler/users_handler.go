package handler

import (
	"app/internal/storage"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	dataUserJson, err := storage.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "DB query failed", "error": err.Error()})
	}

	c.Data(200, "application/json", dataUserJson)
}

func DeleteUser(c *gin.Context) {

}

func UpdateUser(c *gin.Context) {

}
