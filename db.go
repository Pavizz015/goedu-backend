package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://postgres:postgres@localhost:5432/goedu?sslmode=disable"
	}

	var err error
	for i := 1; i <= 30; i++ {
		DB, err = pgxpool.New(context.Background(), dsn)
		if err == nil {
			ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
			err = DB.Ping(ctx)
			cancel()
		}

		if err == nil {
			log.Println("PostgreSQL connected")
			return
		}

		log.Printf("PostgreSQL not ready (%d/30): %v", i, err)
		time.Sleep(1 * time.Second)
	}

	log.Fatal("PostgreSQL connect failed:", err)
}
