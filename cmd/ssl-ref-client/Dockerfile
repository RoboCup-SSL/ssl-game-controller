FROM golang:1.20-alpine AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY . .
RUN go install -v ./cmd/ssl-ref-client

# Start fresh from a smaller image
FROM alpine:3
COPY --from=build_go /go/bin/ssl-ref-client /app/ssl-ref-client
USER 1000
ENTRYPOINT ["/app/ssl-ref-client"]
CMD []
