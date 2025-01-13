FROM golang:1.19-alpine3.15@sha256:eabc3aca6f6c4386369b5b067c9c210aeccd39e76907fa2f8f774fd59d83425a AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY cmd cmd
COPY internal internal
COPY pkg pkg
COPY go.mod .
COPY go.sum .
RUN go install -v ./cmd/ssl-team-client

# Start fresh from a smaller image
FROM alpine:3.21@sha256:56fa17d2a7e7f168a043a2712e63aed1f8543aeafdcee47c58dcffe38ed51099
COPY --from=build_go /go/bin/ssl-team-client /app/ssl-team-client
USER 1000
ENTRYPOINT ["/app/ssl-team-client"]
CMD []
