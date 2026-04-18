FROM golang:1.25-alpine AS build
WORKDIR /app


COPY go.mod go.sum ./
RUN go mod download


COPY . .
RUN go build -o server .

FROM alpine:3.20
WORKDIR /app

COPY --from=build /app/server /app/server
COPY --from=build /app/frontend /app/frontend

EXPOSE 8080
CMD ["/app/server"]