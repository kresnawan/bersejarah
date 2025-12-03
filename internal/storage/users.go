package storage

import (
	"encoding/json"
)

func GetAllUsers() ([]byte, error) {

	type User struct {
		Id       int64  `json:"id"`
		Username string `json:"username"`
		Name     string `json:"name"`
	}

	var users []User
	rows, err := Db.Query("SELECT id, name, username FROM users")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.Id, &user.Name, &user.Username); err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	jsonData, err := json.Marshal(users)
	if err != nil {
		return nil, err
	}

	return jsonData, err
}
