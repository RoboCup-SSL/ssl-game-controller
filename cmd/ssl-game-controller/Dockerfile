FROM node:18-alpine AS build_node
COPY frontend /tmp/ssl-game-controller/frontend
WORKDIR /tmp/ssl-game-controller/frontend
RUN npm install
RUN npm run build

FROM golang:1.20-alpine AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY . .
COPY --from=build_node /tmp/ssl-game-controller/frontend/dist frontend/dist
RUN go install -v ./cmd/ssl-game-controller

# Start fresh from a smaller image
FROM alpine:3
COPY --from=build_go /go/bin/ssl-game-controller /app/ssl-game-controller
RUN mkdir -p config && chown -R 1000: config
USER 1000
ENTRYPOINT ["/app/ssl-game-controller"]
CMD []
