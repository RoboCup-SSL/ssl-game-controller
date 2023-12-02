FROM golang:1.21-alpine AS build_go
ARG cmd=ssl-ref-client
WORKDIR work
COPY . .
RUN go install -v ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3
ARG cmd=ssl-ref-client
COPY --from=build_go /go/bin/${cmd} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
