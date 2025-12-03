package middleware

import (
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func NeedAuth() gin.HandlerFunc {

	return func(c *gin.Context) {

		authHeader := c.Request.Header.Get("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Authorization header not found"})
			c.Abort()
			return
		}

		var authHeaderSplit []string = strings.Split(authHeader, " ")

		if len(authHeaderSplit) != 2 || authHeaderSplit[0] != "Bearer" {
			c.String(http.StatusForbidden, "Token not provided or format isn't supported")
			c.Abort()
			return
		}

		var tokenInput string = authHeaderSplit[1]
		var secretKey []byte = []byte(os.Getenv("JWT_KEY"))

		token, err := jwt.ParseWithClaims(tokenInput, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
			// if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			// 	return nil, fmt.Errorf("unexpected signing method: %v", token.Method.Alg)
			// }

			return secretKey, nil
		})

		if err != nil {
			if errors.Is(err, jwt.ErrTokenExpired) {
				c.JSON(http.StatusForbidden, gin.H{"message": "Token expired", "err": err})
				c.Abort()
				return
			}

			c.JSON(http.StatusForbidden, gin.H{"message": "Invalid token", "err": err})
			c.Abort()
			return
		}

		if !token.Valid {
			c.JSON(http.StatusForbidden, gin.H{"message": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
