package storage

import (
	"app/internal/model"
	"database/sql"
	"encoding/json"
)

func InsertDataTempat(namaTempat, alamatTempat, deskripsiTempat string, lati, longi float32) (int64, error) {
	insertResult, err := Db.Exec("INSERT INTO data_tempat (title, description, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)", namaTempat, deskripsiTempat, alamatTempat, lati, longi)

	if err != nil {
		return 0, err
	}

	insertId, err := insertResult.LastInsertId()

	if err != nil {
		return 0, err
	}

	return insertId, nil
}

func GetAllDataTempat() ([]byte, error) {
	type DataTempat struct {
		Id          int64   `json:"id"`
		Latitude    float64 `json:"latitude"`
		Longitude   float64 `json:"longitude"`
		Title       string  `json:"title"`
		Description string  `json:"description"`
		Address     string  `json:"address"`
		Photo       string  `json:"photo"`
	}
	var dataArr []DataTempat
	query := `
		SELECT 
			d.id,
			d.latitude, 
			d.longitude, 
			d.title, 
			d.description, 
			d.address, 
			f.nama_foto AS photo
		FROM 
			data_tempat d
		LEFT JOIN 
			foto_tempat f 
		ON 
			f.id = (
				SELECT 
					MIN(f_inner.id) 
    			FROM 
					foto_tempat f_inner
    			WHERE 
					f_inner.data_id = d.id
			)
	`
	rows, err := Db.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var data DataTempat
		if err := rows.Scan(&data.Id, &data.Latitude, &data.Longitude, &data.Title, &data.Description, &data.Address, &data.Photo); err != nil {
			return nil, err
		}

		dataArr = append(dataArr, data)
	}

	if len(dataArr) == 0 {
		dataArr = make([]DataTempat, 0)
	}

	jsonData, err := json.Marshal(dataArr)
	if err != nil {
		return nil, err
	}

	return jsonData, err

}

func UploadFotoTempat(DataId int, FotoArr []model.FileD) ([]byte, error) {
	tx, err := Db.Begin()
	if err != nil {
		return nil, err
	}

	defer tx.Rollback()

	stmt, err := tx.Prepare("INSERT INTO foto_tempat (data_id, nama_foto) VALUES (?, ?)")
	if err != nil {
		return nil, err
	}

	defer stmt.Close()

	for _, row := range FotoArr {
		_, err := stmt.Exec(DataId, row.Filename)
		if err != nil {
			return nil, err
		}
	}

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	return []byte("Photos inserted"), nil

}

func GetTempatByID(id string) ([]byte, error) {
	type DataTempat struct {
		Id          int64   `json:"id"`
		Latitude    float64 `json:"latitude"`
		Longitude   float64 `json:"longitude"`
		Title       string  `json:"title"`
		Description string  `json:"description"`
		Address     string  `json:"address"`
		CreatedAt   string  `json:"created_at"`
		UpdatedAt   string  `json:"updated_at"`
	}
	row := Db.QueryRow("SELECT * FROM data_tempat WHERE id = ?", id)

	var dataTempat DataTempat

	err := row.Scan(
		&dataTempat.Id,
		&dataTempat.Latitude,
		&dataTempat.Longitude,
		&dataTempat.Title,
		&dataTempat.Description,
		&dataTempat.UpdatedAt,
		&dataTempat.CreatedAt,
		&dataTempat.Address,
	)
	if err != nil {
		return nil, err
	}

	jsonData, err := json.Marshal(dataTempat)
	if err != nil {
		return nil, err
	}

	return jsonData, nil
}

func GetFotoByID(id string) ([]byte, error) {
	rows, err := Db.Query("SELECT nama_foto FROM foto_tempat WHERE data_id = ?", id)
	if err != nil {
		return nil, err
	}

	var ArrDataNama []string

	defer rows.Close()

	for rows.Next() {
		var DataNama string
		if err := rows.Scan(&DataNama); err != nil {
			return nil, err
		}

		ArrDataNama = append(ArrDataNama, DataNama)
	}

	if len(ArrDataNama) == 0 {
		ArrDataNama = make([]string, 0)
	}

	jsonData, err := json.Marshal(ArrDataNama)
	if err != nil {
		return nil, err
	}

	return jsonData, nil

}

func DeleteData(id string) (sql.Result, error) {
	res, err := Db.Exec("DELETE FROM data_tempat WHERE id = ?", id)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func EditData(id int, lati, longi float32, addr string, desc string) (sql.Result, error) {
	res, err := Db.Exec(`
		UPDATE
			data_tempat
		SET
			latitude = ?,
			longitude = ?,
			address = ?,
			description = ?
		WHERE
			id = ?

	`, lati, longi, addr, desc, id)

	if err != nil {
		return nil, err
	}

	return res, nil
}
