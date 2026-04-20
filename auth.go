package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type contextKey string

const ctxUserIDKey contextKey = "userID"

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Status string `json:"status"`
	Token  string `json:"token,omitempty"`
}

type UserResponse struct {
	ID          int    `json:"id"`
	Email       string `json:"email"`
	XP          int    `json:"xp"`
	Level       int    `json:"level"`
	Title       string `json:"title"`
	Streak      int    `json:"streak"`
	Username    string `json:"username"`
	Bio         string `json:"bio"`
	Country     string `json:"country"`
	AvatarColor string `json:"avatar_color"`
}

func calcLevel(xp int) (int, string) {
	switch {
	case xp >= 300:
		return 4, "Senior"
	case xp >= 150:
		return 3, "Middle"
	case xp >= 50:
		return 2, "Junior"
	default:
		return 1, "Trainee"
	}
}

func jwtSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev_secret_change_me"
	}
	return []byte(secret)
}

func generateToken(userID int) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(7 * 24 * time.Hour).Unix(),
		"iat": time.Now().Unix(),
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return t.SignedString(jwtSecret())
}

func parseToken(tokenStr string) (int, error) {
	t, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if token.Method != jwt.SigningMethodHS256 {
			return nil, errors.New("unexpected signing method")
		}
		return jwtSecret(), nil
	})
	if err != nil || !t.Valid {
		return 0, errors.New("invalid token")
	}

	claims, ok := t.Claims.(jwt.MapClaims)
	if !ok {
		return 0, errors.New("invalid claims")
	}

	sub, ok := claims["sub"]
	if !ok {
		return 0, errors.New("no sub")
	}

	switch v := sub.(type) {
	case float64:
		return int(v), nil
	case int:
		return v, nil
	default:
		return 0, errors.New("bad sub type")
	}
}

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		h := r.Header.Get("Authorization")
		if h == "" {
			http.Error(w, "missing Authorization header", http.StatusUnauthorized)
			return
		}

		parts := strings.SplitN(h, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			http.Error(w, "bad Authorization header", http.StatusUnauthorized)
			return
		}

		userID, err := parseToken(parts[1])
		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), ctxUserIDKey, userID)
		next(w, r.WithContext(ctx))
	}
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if req.Email == "" || len(req.Password) < 6 {
		http.Error(w, "email required and password >= 6", http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "hash error", http.StatusInternalServerError)
		return
	}

	var userID int
	err = DB.QueryRow(r.Context(),
		`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
		req.Email, string(hash),
	).Scan(&userID)
	if err != nil {
		http.Error(w, "db error", http.StatusBadRequest)
		return
	}

	token, err := generateToken(userID)
	if err != nil {
		http.Error(w, "email already exists", http.StatusConflict)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{
		Status: "registered",
		Token:  token,
	})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if req.Email == "" || req.Password == "" {
		http.Error(w, "email and password required", http.StatusBadRequest)
		return

	}

	var (
		userID   int
		passHash string
	)

	err := DB.QueryRow(r.Context(),
		`SELECT id, password FROM users WHERE email=$1`,
		req.Email,
	).Scan(&userID, &passHash)
	if err != nil {
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(passHash), []byte(req.Password)); err != nil {
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	updateStreak(r, userID)

	token, err := generateToken(userID)
	if err != nil {
		http.Error(w, "token error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{
		Status: "login successful",
		Token:  token,
	})
}

func meHandler(w http.ResponseWriter, r *http.Request) {
	userIDAny := r.Context().Value(ctxUserIDKey)
	userID, ok := userIDAny.(int)
	if !ok || userID <= 0 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var u UserResponse
	err := DB.QueryRow(r.Context(),
		`SELECT id, email, xp, streak, COALESCE(username,''), COALESCE(bio,''), COALESCE(country,''), COALESCE(avatar_color,'#00d4a0') FROM users WHERE id=$1`, userID,
	).Scan(&u.ID, &u.Email, &u.XP, &u.Streak, &u.Username, &u.Bio, &u.Country, &u.AvatarColor)
	if err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}

	u.Level, u.Title = calcLevel(u.XP)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func updateStreak(r *http.Request, userID int) {
	today := time.Now().UTC().Truncate(24 * time.Hour)
	var lastActivity *time.Time
	DB.QueryRow(r.Context(),
		`SELECT last_activity FROM users WHERE id=$1`, userID,
	).Scan(&lastActivity)

	if lastActivity == nil {
		DB.Exec(r.Context(),
			`UPDATE users SET streak=1, last_activity=$1 WHERE id=$2`, today, userID)
		return
	}

	yesterday := today.AddDate(0, 0, -1)
	last := lastActivity.UTC().Truncate(24 * time.Hour)

	if last.Equal(today) {
		return
	} else if last.Equal(yesterday) {
		DB.Exec(r.Context(),
			`UPDATE users SET streak=streak+1, last_activity=$1 WHERE id=$2`, today, userID)
	} else {
		DB.Exec(r.Context(),
			`UPDATE users SET streak=1, last_activity=$1 WHERE id=$2`, today, userID)
	}
}

type UpdateProfileRequest struct {
	Username    string `json:"username"`
	Bio         string `json:"bio"`
	Country     string `json:"country"`
	AvatarColor string `json:"avatar_color"`
}

func updateProfileHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userIDAny := r.Context().Value(ctxUserIDKey)
	userID, ok := userIDAny.(int)
	if !ok || userID <= 0 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}

	_, err := DB.Exec(r.Context(),
		`UPDATE users SET username=$1, bio=$2, country=$3, avatar_color=$4 WHERE id=$5`,
		req.Username, req.Bio, req.Country, req.AvatarColor, userID,
	)
	if err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

func changePasswordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userIDAny := r.Context().Value(ctxUserIDKey)
	userID, ok := userIDAny.(int)
	if !ok || userID <= 0 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req ChangePasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}

	if len(req.NewPassword) < 6 {
		http.Error(w, "password too short", http.StatusBadRequest)
		return
	}

	var hash string
	err := DB.QueryRow(r.Context(),
		`SELECT password FROM users WHERE id=$1`, userID,
	).Scan(&hash)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(req.OldPassword)); err != nil {
		http.Error(w, "wrong password", http.StatusUnauthorized)
		return
	}

	newHash, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "hash error", http.StatusInternalServerError)
		return
	}

	DB.Exec(r.Context(),
		`UPDATE users SET password=$1 WHERE id=$2`, string(newHash), userID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
