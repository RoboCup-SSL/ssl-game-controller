FROM golang:1.24-alpine@sha256:68932fa6d4d4059845c8f40ad7e654e626f3ebd3706eef7846f319293ab5cb7a AS build_go
ARG cmd=ssl-ref-client
WORKDIR work
COPY . .
RUN go install -v ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3@sha256:4bcff63911fcb4448bd4fdacec207030997caf25e9bea4045fa6c8c44de311d1
ARG cmd=ssl-ref-client
COPY --from=build_go /go/bin/${cmd} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
