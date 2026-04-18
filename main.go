package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	_ "goedu-backend/docs"

	httpSwagger "github.com/swaggo/http-swagger/v2"
)

// lessonsRouter роутит:
// GET  /lessons          список уроков
// GET  /lessons/{id}      один урок
// POST /lessons/{id}/submit  отправка ответа (требует Bearer токен)
func lessonsRouter(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/lessons" {
		lessonsListHandler(w, r)
		return
	}

	if strings.HasPrefix(r.URL.Path, "/lessons/") {
		if strings.HasSuffix(r.URL.Path, "/submit") {
			authMiddleware(submitHandler)(w, r)
			return
		}
		lessonGetHandler(w, r)
		return
	}

	http.NotFound(w, r)
}

// @title           GoEdu API
// @version         1.0
// @description     Backend для обучения Go: регистрация, логин, уроки, прогресс.
// @host            localhost:8080
// @BasePath        /
//
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	InitDB()
	defer DB.Close()

	mux := http.NewServeMux()

	// healthcheck / ping
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	// auth
	mux.HandleFunc("/register", registerHandler)
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/me", authMiddleware(meHandler))

	// lessons
	mux.HandleFunc("/lessons", lessonsRouter)
	mux.HandleFunc("/lessons/", lessonsRouter)

	// progress
	mux.HandleFunc("/progress", authMiddleware(progressHandler))

	// swagger
	mux.Handle("/swagger/", httpSwagger.WrapHandler)

	// frontend
	mux.Handle("/", http.FileServer(http.Dir("./frontend")))

	// middlewares
	var handler http.Handler = mux
	handler = withCORS(handler)
	handler = withLogging(handler)

	log.Println("Server on :8080")
	go openBrowser("http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
