package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"app/internal/model"
	"app/internal/storage"
	"app/utility"

	"github.com/gin-gonic/gin"
)

func GetAllDataTempat(c *gin.Context) {
	data, err := storage.GetAllDataTempat()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed fetch the data", "err": err.Error()})
		c.Abort()
		return
	}

	c.Data(200, "application/json", data)
}

func AddDataTempat(c *gin.Context) {
	type RequestBody struct {
		NamaTempat      string  `json:"nama_tempat"`
		AlamatJalan     string  `json:"alamat_jalan"`
		AlamatDusun     string  `json:"alamat_dusun"`
		AlamatKelurahan string  `json:"alamat_kelurahan"`
		AlamatKecamatan string  `json:"alamat_kecamatan"`
		AlamatKabupaten string  `json:"alamat_kabupaten"`
		DeskripsiTempat string  `json:"deskripsi"`
		Latitude        float32 `json:"lat"`
		Longitude       float32 `json:"long"`
	}

	var ReqBody RequestBody

	if err := c.ShouldBindJSON(&ReqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed reading request body"})
		c.Abort()
		return
	}

	var address string = utility.ParseAddress(
		ReqBody.AlamatJalan,
		ReqBody.AlamatDusun,
		ReqBody.AlamatKelurahan,
		ReqBody.AlamatKecamatan,
		ReqBody.AlamatKabupaten,
	)

	insertId, err := storage.InsertDataTempat(
		ReqBody.NamaTempat,
		address,
		ReqBody.DeskripsiTempat,
		ReqBody.Latitude,
		ReqBody.Longitude,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed inserting data", "err": err})
		c.Abort()
		return
	}

	c.JSON(200, gin.H{"message": "Data successfully inserted", "insertid": insertId})
}

func UploadFoto(c *gin.Context) {

	form, err := c.MultipartForm()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed reading the image"})
		c.Abort()
		return
	}

	files := form.File["images"]

	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No files uploaded", "files": files})
		c.Abort()
		return
	}

	var counter = 0
	var imageArr []model.FileD
	id, err := strconv.Atoi(c.PostForm("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed parse data id for image", "err": err})
	}

	// Memeriksa apakah ada file yang ukurannya lebih dari 1MB

	// for _, file := range files {
	// 	if file.Size > 5000000 {
	// 		c.Data(http.StatusBadRequest, "application/json", []byte(`{"message":"Images size too big"}`))
	// 		c.Abort()
	// 		return
	// 	}
	// }

	for _, file := range files {

		fileExt := filepath.Ext(file.Filename)
		now := time.Now()

		epochMill := now.UnixNano()
		filename := strconv.FormatInt(epochMill, 10) + fileExt
		dst := filepath.Join("./uploads", filename)

		if err := c.SaveUploadedFile(file, dst); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed saving the files in the cloud", "err": err})
			c.Abort()
			return
		}

		var fileIns model.FileD
		fileIns.Filename = filename
		fileIns.Size = int(file.Size)

		imageArr = append(imageArr, fileIns)
		counter++
	}

	result, err := storage.UploadFotoTempat(id, imageArr)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed insert images into database", "err": err})
		c.Abort()
		return
	}

	type SuccessResponse struct {
		Message string        `json:"message"`
		Files   []model.FileD `json:"files"`
		Query   string        `json:"query"`
	}

	var response SuccessResponse
	response.Message = fmt.Sprintf("Successfully saved %v files", counter)
	response.Files = imageArr
	response.Query = string(result)

	resoo, err := json.Marshal(response)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed convert image array to json", "err": err})
	}

	c.Data(200, "application/json", resoo)
	c.Abort()
	return

}

func GetTempatByID(c *gin.Context) {
	id := c.Param("id")

	data, err := storage.GetTempatByID(id)
	if err != nil {

		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"message": "Row not found"})
			c.Abort()
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"message": "Query failed", "err": err.Error()})
		c.Abort()
		return
	}

	c.Data(200, "application/json", data)
}

func GetFotoByID(c *gin.Context) {
	id := c.Param("id")
	data, err := storage.GetFotoByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			c.Status(404)
			c.Abort()
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error query"})
		c.Abort()
		return
	}

	c.Data(200, "application/json", data)
}

func DeleteDataTempat(c *gin.Context) {
	DataID := c.Param("id")

	res, err := storage.DeleteData(DataID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Execution failed", "err": err.Error()})
		c.Abort()
		return
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Execution failed", "err": err.Error()})
		c.Abort()
		return
	}

	c.JSON(200, gin.H{"message": "Data deleted successfully", "rows_affected": rowsAffected})
}

func UpdateDataTempat(c *gin.Context) {
	type RequestBody struct {
		ID        int     `json:"id"`
		Alamat    string  `json:"addr"`
		Deskripsi string  `json:"desc"`
		Latitude  float32 `json:"lat"`
		Longitude float32 `json:"long"`
	}

	var body RequestBody

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		c.Abort()
		return
	}

	res, err := storage.EditData(body.ID, body.Latitude, body.Longitude, body.Alamat, body.Deskripsi)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		c.Abort()
		return
	}

	rowsA, err := res.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		c.Abort()
		return
	}

	c.JSON(200, gin.H{"message": "Data successfully updated", "affected_rows": rowsA})
	c.Abort()

}

func GetKomentarTempatFromTempatId(c *gin.Context) {
	id := c.Param("id")
	res, err := storage.GetKomentarTempatByTempatId(id)
	if err != nil {
		c.JSON(500, gin.H{"message": err})
		c.Abort()
		return
	}

	c.Data(200, "application/json", res)
	c.Abort()
}

func UploadKomentarTempat(c *gin.Context) {
	type KomentarBody struct {
		Nama  string `json:"nama"`
		Pesan string `json:"pesan"`
	}

	tempatId := c.Param("id")

	var body KomentarBody

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err})
		c.Abort()
		return
	}

	ra, err := storage.UploadKomentarTempat(tempatId, body.Nama, body.Pesan)

	if err != nil {
		c.JSON(500, gin.H{"message": err})
		c.Abort()
		return
	}

	c.JSON(200, gin.H{"message": "Komentar berhasil diunggah", "affectedRows": ra})
	c.Abort()
}

func DeleteKomentarTempatById(c *gin.Context) {
	id := c.Param("id_k")
	ra, err := storage.DeleteKomentarTempatById(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err})
		c.Abort()
		return
	}

	c.JSON(200, gin.H{"message": "Komentar berhasil dihapus", "affectedRows": ra})
	c.Abort()

}
