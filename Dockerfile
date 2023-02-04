FROM node:18-alpine AS build_node
COPY frontend /tmp/ssl-game-controller/frontend
WORKDIR /tmp/ssl-game-controller/frontend
RUN npm install
RUN npm run build

FROM golang:1.20-alpine AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY cmd cmd
COPY internal internal
COPY pkg pkg
COPY frontend frontend
COPY go.mod .
COPY go.sum .
COPY --from=build_node /tmp/ssl-game-controller/frontend/dist frontend/dist
RUN go install -v ./cmd/ssl-game-controller

# Start fresh from a smaller image
FROM alpine:3
COPY --from=build_go /go/bin/ssl-game-controller /app/ssl-game-controller
RUN mkdir -p config && chown -R 1000: config
USER 1000
EXPOSE 8081 10007 10008 10009 10011 10107 10108 10111
ENTRYPOINT ["/app/ssl-game-controller"]
CMD []
