package storage

import (
	"app/internal/model"
)

func GetUserWithSpecificUsername(username string) ([]model.User, error) {
	var users []model.User
	rows, err := Db.Query("SELECT username, password from users WHERE username = ?", username)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var user model.User
		if err := rows.Scan(&user.Username, &user.Password); err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil

}

func InsertUser(name string, username string, password string) (int64, error) {
	var query string = "INSERT INTO `users` (`username`, `password`, `name`) VALUES (?, ?, ?)"
	insertResult, err := Db.Exec(query, username, password, name)
	if err != nil {
		return 0, err
	}

	insertId, err := insertResult.LastInsertId()
	if err != nil {
		return 0, err
	}

	return insertId, nil
}
