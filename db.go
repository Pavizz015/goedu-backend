package main

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() {
	dsn := "postgres://postgres:postgres@localhost:5432/goedu"

	var err error
	DB, err = pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatal(err)
	}

	if err = DB.Ping(context.Background()); err != nil {
		log.Fatal(err)
	}

	log.Println("PostgreSQL connected")
}
