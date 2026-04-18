	package main

	import (
		"encoding/json"
		"net/http"
		"strconv"
		"strings"
		"time"
	)

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

	type SubmitResponse struct {
		Correct bool `json:"correct"`
	}

	func lessonsListHandler(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		rows, err := DB.Query(r.Context(), `
			SELECT id, title, theory, question, options
			FROM lessons
			ORDER BY id
		`)
		if err != nil {
			http.Error(w, "db error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		out := make([]LessonPublic, 0)
		for rows.Next() {
			var l LessonPublic
			var optionsJSON []byte
			if err := rows.Scan(&l.ID, &l.Title, &l.Theory, &l.Question, &optionsJSON); err != nil {
				http.Error(w, "db error", http.StatusInternalServerError)
				return
			}
			if err := json.Unmarshal(optionsJSON, &l.Options); err != nil {
				http.Error(w, "bad options data", http.StatusInternalServerError)
				return
			}
			out = append(out, l)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(out)
	}

	func lessonGetHandler(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		parts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
		if len(parts) != 2 {
			http.Error(w, "bad path", http.StatusBadRequest)
			return
		}
		id, err := strconv.Atoi(parts[1])
		if err != nil || id <= 0 {
			http.Error(w, "bad id", http.StatusBadRequest)
			return
		}

		var l LessonPublic
		var optionsJSON []byte
		err = DB.QueryRow(r.Context(), `
			SELECT id, title, theory, question, options
			FROM lessons
			WHERE id=$1
		`, id).Scan(&l.ID, &l.Title, &l.Theory, &l.Question, &optionsJSON)
		if err != nil {
			http.Error(w, "not found", http.StatusNotFound)
			return
		}

		if err := json.Unmarshal(optionsJSON, &l.Options); err != nil {
			http.Error(w, "bad options data", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(l)
	}

	func submitHandler(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userIDAny := r.Context().Value(ctxUserIDKey)
		userID, ok := userIDAny.(int)
		if !ok || userID <= 0 {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
		if len(parts) != 3 || parts[2] != "submit" {
			http.Error(w, "bad path", http.StatusBadRequest)
			return
		}
		lessonID, err := strconv.Atoi(parts[1])
		if err != nil || lessonID <= 0 {
			http.Error(w, "bad id", http.StatusBadRequest)
			return
		}

		var req SubmitRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "bad json", http.StatusBadRequest)
			return
		}

		var correctAnswer int
		err = DB.QueryRow(r.Context(),
			`SELECT answer FROM lessons WHERE id=$1`,
			lessonID,
		).Scan(&correctAnswer)
		if err != nil {
			http.Error(w, "lesson not found", http.StatusNotFound)
			return
		}

		correct := req.Answer == correctAnswer

		_, err = DB.Exec(r.Context(), `
			INSERT INTO progress (user_id, lesson_id, is_correct, created_at)
			VALUES ($1, $2, $3, $4)
	`, userID, lessonID, correct, time.Now())
		if err != nil {
			http.Error(w, "db error", http.StatusInternalServerError)
			return
		}

		if correct {
			DB.Exec(r.Context(),
				`UPDATE users SET xp = xp + (SELECT xp_reward FROM lessons WHERE id=$1) WHERE id=$2`,
				lessonID, userID)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(SubmitResponse{Correct: correct})
	}

	type ProgressRow struct {
		LessonID  int       `json:"lesson_id"`
		IsCorrect bool      `json:"is_correct"`
		CreatedAt time.Time `json:"created_at"`
	}

	func progressHandler(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userIDAny := r.Context().Value(ctxUserIDKey)
		userID, ok := userIDAny.(int)
		if !ok || userID <= 0 {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		rows, err := DB.Query(r.Context(), `
			SELECT lesson_id, is_correct, created_at
			FROM progress
			WHERE user_id=$1
			ORDER BY created_at DESC
			LIMIT 200
		`, userID)
		if err != nil {
			http.Error(w, "db error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		out := make([]ProgressRow, 0)
		for rows.Next() {
			var p ProgressRow
			if err := rows.Scan(&p.LessonID, &p.IsCorrect, &p.CreatedAt); err != nil {
				http.Error(w, "db error", http.StatusInternalServerError)
				return
			}
			out = append(out, p)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(out)
	}
