# GoEdu Backend

Backend API for a **desktop application designed to learn the Go programming language**.

The server provides a REST API for:

* user registration and authentication using JWT
* retrieving lessons and submitting answers
* tracking learning progress
* XP system with levels and titles
* daily streak tracking
* user profile management

The desktop application communicates with the backend through HTTP requests.

---

# Architecture

```
Desktop Application
        ↓
  Go REST API (:8080)
        ↓
  PostgreSQL Database
```

---

# Technologies

* Go 1.23
* PostgreSQL (via `jackc/pgx v5`)
* Docker / Docker Compose
* JWT Authentication (`golang-jwt/jwt v5`)
* bcrypt password hashing
* Swagger (API documentation via `swaggo`)
* CORS and request logging middleware

---

# API Endpoints

## Healthcheck

```
GET /ping
```

## Authentication

```
POST /register
POST /login
GET  /me               🔒
PUT  /profile          🔒
PUT  /change-password  🔒
```

> 🔒 — requires `Authorization: Bearer <token>` header

---

## Lessons

```
GET  /lessons
GET  /lessons/{id}
POST /lessons/{id}/submit  🔒
```

---

## Progress

```
GET /progress  🔒
```

---

# User System

Users accumulate XP by completing lessons. Based on XP, the system assigns a level and title automatically:

| XP       | Level | Title   |
|----------|-------|---------|
| 0–49     | 1     | Trainee |
| 50–149   | 2     | Junior  |
| 150–299  | 3     | Middle  |
| 300+     | 4     | Senior  |

Each login updates the user's daily streak automatically.

---

# Swagger API Documentation

After starting the server, open:

http://localhost:8080/swagger/index.html

---

# Running the Project

## Run with Docker (recommended)

```bash
docker compose up --build
```

The API will be available at:

http://localhost:8080

---

## Run without Docker

1. Install PostgreSQL

2. Create database:

```
goedu
```

3. Start the server:

```bash
go run .
```

---

# Environment Variables

| Variable     | Default                | Description     |
|--------------|------------------------|-----------------|
| `JWT_SECRET` | `dev_secret_change_me` | JWT signing key |

---

# Project Structure

```
goedu-backend/
│
├── main.go          — entry point, routing, global middlewares
├── auth.go          — register, login, /me, profile, change-password
├── db.go            — PostgreSQL connection
├── lessons.go       — lessons list, single lesson, submit answer, progress
├── middleware.go    — JWT auth, CORS, logging
│
├── db/
│   └── init.sql     — database schema
│
├── docs/
│   ├── docs.go
│   ├── swagger.json
│   └── swagger.yaml
│
├── frontend/        — desktop frontend (JS/CSS/HTML)
│
├── Dockerfile
├── docker-compose.yml
├── go.mod
└── go.sum
```

---

# Example Requests

**Register:**

```
POST /register
```

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Response:

```json
{
  "status": "registered",
  "token": "JWT_TOKEN"
}
```

---

**Get current user:**

```
GET /me
Authorization: Bearer JWT_TOKEN
```

```json
{
  "id": 1,
  "email": "user@mail.com",
  "xp": 150,
  "level": 3,
  "title": "Middle",
  "streak": 5,
  "username": "gopher",
  "bio": "",
  "country": "KZ",
  "avatar_color": "#00d4a0"
}
```

---

**Submit an answer:**

```
POST /lessons/1/submit
Authorization: Bearer JWT_TOKEN
```

```json
{
  "answer": 2
}
```

Response:

```json
{
  "correct": true
}
```

---

# Purpose of the Project

This backend was developed for a **desktop learning application for the Go programming language**.

The application allows users to:

* read theory
* answer quiz questions
* earn XP and level up
* track daily streaks
* manage their profile

---

# Author

Educational project for learning backend development with Go.