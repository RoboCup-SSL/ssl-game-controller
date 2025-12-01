FROM golang:1.24-alpine@sha256:12c199a889439928e36df7b4c5031c18bfdad0d33cdeae5dd35b2de369b5fbf5 AS build_go
ARG cmd=ssl-ref-client
WORKDIR work
COPY . .
RUN go install -v ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412
ARG cmd=ssl-ref-client
COPY --from=build_go /go/bin/${cmd} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
