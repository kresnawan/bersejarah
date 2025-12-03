package handler

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"app/internal/storage"

	"github.com/alexedwards/argon2id"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Login(c *gin.Context) {

	type RequestBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	var ReqBody RequestBody

	// Membaca request body
	if err := c.BindJSON(&ReqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Gagal membaca request body", "error": err.Error()})
		return
	}

	// DB error
	arr, err := storage.GetUserWithSpecificUsername(ReqBody.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "DB query failed", "error": err.Error()})
		c.Abort()
		return
	}

	// Username not found / array length = 0
	if len(arr) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Username not found"})
		c.Abort()
		return
	}

	// Check password
	match, err := argon2id.ComparePasswordAndHash(ReqBody.Password, arr[0].Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Password compare error"})
		c.Abort()
		return
	}

	// Wrong password
	if match == false {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Wrong password"})
		c.Abort()
		return
	}

	var (
		key []byte
		t   *jwt.Token
	)

	key = []byte(os.Getenv("JWT_KEY"))
	t = jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"sub": ReqBody.Username,
			"iss": "com.kresnawan.bersejarah",
			"exp": time.Now().Add(time.Minute).Unix(),
			"iat": time.Now().Unix(),
		})

	s, err := t.SignedString(key)
	if err != nil {
		c.Status(500)
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login berhasil", "access_token": s})
	c.Abort()
	return
}

func Register(c *gin.Context) {
	type RequestBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	var ReqBody RequestBody

	// Membaca request body
	if err := c.BindJSON(&ReqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Failed reading request body"})
		return
	}

	// Hashing password
	hashedPassword, err := argon2id.CreateHash(ReqBody.Password, argon2id.DefaultParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Hashing password error", "error": err.Error()})
		c.Abort()
		return
	}

	// Insert data
	insertId, err := storage.InsertUser(ReqBody.Name, ReqBody.Username, hashedPassword)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"message": "Username already taken"})
		c.Abort()
		return
	}

	stringedInsertId := strconv.FormatInt(insertId, 10)

	c.JSON(http.StatusOK, gin.H{"message": "User registered, id: " + stringedInsertId})
	c.Abort()
	return
}
