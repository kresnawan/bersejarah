package storage

import (
	"app/internal/env"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
)

func ConnectToDB() *sql.DB {
	env.AddEnv()
	cfg := mysql.Config{
		User:                 os.Getenv("DB_USERNAME"),
		Passwd:               os.Getenv("DB_PASSWORD"),
		Net:                  "tcp",
		Addr:                 os.Getenv("DB_ADDRESS"),
		DBName:               os.Getenv("DB_NAME"),
		AllowNativePasswords: true,
		ParseTime:            true,
		Collation:            "utf8mb4_unicode_ci",
		Loc:                  time.Local,
		Timeout:              30 * time.Second,
		ReadTimeout:          30 * time.Second,
		WriteTimeout:         30 * time.Second,
	}

	dsn := cfg.FormatDSN()
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetConnMaxIdleTime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	err = db.Ping()
	if err != nil {
		log.Fatalf("Database not responding: %v", err)
	}

	fmt.Printf("DB established, ready to use!\n%v\n", time.Now().Format(time.DateTime))

	return db
}

var Db = ConnectToDB()
