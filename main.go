package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Status string `json:"status"`
	Token  string `json:"token,omitempty"`
}

// ВАЖНО: тут НЕТ Answer — значит в JSON его не будет
type LessonPublic struct {
	ID       int      `json:"id"`
	Title    string   `json:"title"`
	Theory   string   `json:"theory"`
	Question string   `json:"question"`
	Options  []string `json:"options"`
}

type SubmitRequest struct {
	Answer int `json:"answer"`
}

type ProgressResponse struct {
	TotalLessons int `json:"total_lessons"`
	Attempts     int `json:"attempts"`
	Correct      int `json:"correct"`
	LastLessonID int `json:"last_lesson_id"`
}

func main() {
	InitDB()
	defer DB.Close()

	http.HandleFunc("/ping", pingHandler)
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)

	http.HandleFunc("/me", authMiddleware(meHandler))

	http.HandleFunc("/lessons", authMiddleware(lessonsListHandler))
	http.HandleFunc("/lessons/", authMiddleware(lessonRouter))

	http.HandleFunc("/progress", authMiddleware(progressHandler))

	log.Println("Server on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func pingHandler(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if len(req.Email) < 5 || len(req.Password) < 6 {
		http.Error(w, "invalid email or password", http.StatusBadRequest)
		return
	}

	var exists bool
	if err := DB.QueryRow(r.Context(),
		`SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)`,
		req.Email,
	).Scan(&exists); err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}

	if exists {
		http.Error(w, "email already registered", http.StatusConflict)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	_, err = DB.Exec(r.Context(),
		`INSERT INTO users (email, password) VALUES ($1, $2)`,
		req.Email, string(hashedPassword),
	)
	if err != nil {
		http.Error(w, "insert error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]string{
		"status": "registered successfully",
	})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	var userID int
	var hashedPassword string

	err := DB.QueryRow(r.Context(),
		`SELECT id, password FROM users WHERE email=$1`,
		req.Email,
	).Scan(&userID, &hashedPassword)

	if err != nil {
		http.Error(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password)); err != nil {
		http.Error(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	token, err := generateToken(userID, req.Email)
	if err != nil {
		http.Error(w, "token error", http.StatusInternalServerError)
		return
	}

	_ = json.NewEncoder(w).Encode(AuthResponse{
		Status: "login successful",
		Token:  token,
	})
}

func meHandler(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(map[string]any{
		"user_id": getUserID(r),
		"email":   getUserEmail(r),
	})
}

// ------- LESSONS (без answer) -------

func lessonsListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	rows, err := DB.Query(r.Context(),
		`SELECT id, title, theory, question, options FROM lessons ORDER BY id`)
	if err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var lessons []LessonPublic
	for rows.Next() {
		var l LessonPublic
		var optionsJSON []byte
		if err := rows.Scan(&l.ID, &l.Title, &l.Theory, &l.Question, &optionsJSON); err != nil {
			http.Error(w, "db scan error", http.StatusInternalServerError)
			return
		}
		_ = json.Unmarshal(optionsJSON, &l.Options)
		lessons = append(lessons, l)
	}

	_ = json.NewEncoder(w).Encode(lessons)
}

func lessonRouter(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/lessons/")
	if strings.Contains(path, "submit") {
		submitHandler(w, r)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	id, err := strconv.Atoi(path)
	if err != nil || id <= 0 {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	var l LessonPublic
	var optionsJSON []byte

	err = DB.QueryRow(r.Context(),
		`SELECT id, title, theory, question, options FROM lessons WHERE id=$1`,
		id,
	).Scan(&l.ID, &l.Title, &l.Theory, &l.Question, &optionsJSON)

	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}

	_ = json.Unmarshal(optionsJSON, &l.Options)
	_ = json.NewEncoder(w).Encode(l)
}

// ------- SUBMIT (answer берём из БД, фронту не отдаём) -------

func submitHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	path := strings.TrimPrefix(r.URL.Path, "/lessons/")
	parts := strings.Split(path, "/")
	if len(parts) != 2 || parts[1] != "submit" {
		http.Error(w, "invalid route", http.StatusBadRequest)
		return
	}

	lessonID, err := strconv.Atoi(parts[0])
	if err != nil || lessonID <= 0 {
		http.Error(w, "invalid lesson id", http.StatusBadRequest)
		return
	}

	var req SubmitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	var correctAnswer int
	if err := DB.QueryRow(r.Context(),
		`SELECT answer FROM lessons WHERE id=$1`,
		lessonID,
	).Scan(&correctAnswer); err != nil {
		http.Error(w, "lesson not found", http.StatusNotFound)
		return
	}

	isCorrect := req.Answer == correctAnswer

	userID := getUserID(r)
	if userID == 0 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	_, err = DB.Exec(r.Context(),
		`INSERT INTO progress (user_id, lesson_id, is_correct) VALUES ($1, $2, $3)`,
		userID, lessonID, isCorrect,
	)
	if err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}

	_ = json.NewEncoder(w).Encode(map[string]bool{"correct": isCorrect})
}

// ------- PROGRESS -------

func progressHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := getUserID(r)
	if userID == 0 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var totalLessons int
	_ = DB.QueryRow(r.Context(), `SELECT COUNT(*) FROM lessons`).Scan(&totalLessons)

	var attempts int
	_ = DB.QueryRow(r.Context(),
		`SELECT COUNT(*) FROM progress WHERE user_id=$1`,
		userID).Scan(&attempts)

	var correct int
	_ = DB.QueryRow(r.Context(),
		`SELECT COUNT(*) FROM progress WHERE user_id=$1 AND is_correct=true`,
		userID).Scan(&correct)

	var lastLessonID int
	_ = DB.QueryRow(r.Context(),
		`SELECT COALESCE(MAX(lesson_id), 0) FROM progress WHERE user_id=$1`,
		userID).Scan(&lastLessonID)

	_ = json.NewEncoder(w).Encode(ProgressResponse{
		TotalLessons: totalLessons,
		Attempts:     attempts,
		Correct:      correct,
		LastLessonID: lastLessonID,
	})
}
