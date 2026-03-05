# GoEdu Backend

Backend API for a **desktop application designed to learn the Go programming language**.

The server provides a REST API for:

* user registration
* authentication using JWT
* retrieving lessons
* submitting answers
* tracking learning progress

The desktop application communicates with the backend through HTTP requests.

---

# Architecture

Desktop Application
↓
Go REST API
↓
PostgreSQL Database

---

# Technologies

This project uses:

* Go
* PostgreSQL
* Docker
* JWT Authentication
* Swagger (API documentation)

---

# API Endpoints

## Authentication

POST /register
POST /login
GET /me

---

## Lessons

GET /lessons
GET /lessons/{id}
POST /lessons/{id}/submit

---

## Progress

GET /progress

---

# Swagger API Documentation

Swagger allows you to explore and test the API directly in the browser.

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

# Project Structure

```
goedu-backend
│
├── main.go
├── auth.go
├── db.go
├── lessons.go
├── middleware.go
├── swagger.go
│
├── db/
│   └── init.sql
│
├── docs/
│   ├── docs.go
│   ├── swagger.json
│   └── swagger.yaml
│
├── Dockerfile
├── docker-compose.yml
├── go.mod
└── go.sum
```

---

# Example Request

User registration:

POST /register

Request body:

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# Purpose of the Project

This backend was developed for a **desktop learning application for the Go programming language**.

The application allows users to:

* read theory
* answer quiz questions
* track their learning progress.

---

# Author

Educational project for learning backend development with Go.
