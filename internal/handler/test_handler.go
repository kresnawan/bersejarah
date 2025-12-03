package handler

import (
	"github.com/alexedwards/argon2id"
	"github.com/gin-gonic/gin"
)

func GetHashFromParams(c *gin.Context) {
	stringToHash := c.Param("text")

	hash := "$argon2id$v=19$m=65536,t=2,p=4$IH8aRmrxbrgnRZiUmO3tvA$4yMZPS+sc7RU32WDd7E0Xu+OnLYusircOsH5d3lWGjI"

	hashResult, err := argon2id.CreateHash(stringToHash, argon2id.DefaultParams)
	if err != nil {
		c.JSON(400, gin.H{"message": "Error hashing"})
		c.Abort()
	}

	match, err := argon2id.ComparePasswordAndHash(stringToHash, hash)
	if err != nil {
		c.JSON(400, gin.H{"message": "Error hashing"})
		c.Abort()
	}

	c.JSON(200, gin.H{"message": stringToHash, "hash": hashResult, "compare": match})

}

func HelloWorld(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello world"})
}
