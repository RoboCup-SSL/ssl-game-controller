FROM golang:1.19-alpine3.15@sha256:eabc3aca6f6c4386369b5b067c9c210aeccd39e76907fa2f8f774fd59d83425a AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY cmd cmd
COPY internal internal
COPY pkg pkg
COPY go.mod .
COPY go.sum .
RUN go install -v ./cmd/ssl-team-client

# Start fresh from a smaller image
FROM alpine:3.22@sha256:4bcff63911fcb4448bd4fdacec207030997caf25e9bea4045fa6c8c44de311d1
COPY --from=build_go /go/bin/ssl-team-client /app/ssl-team-client
USER 1000
ENTRYPOINT ["/app/ssl-team-client"]
CMD []
