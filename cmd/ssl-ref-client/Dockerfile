FROM --platform=$BUILDPLATFORM golang:1.26-alpine@sha256:0178a641fbb4858c5f1b48e34bdaabe0350a330a1b1149aabd498d0699ff5fb2 AS build_go
ARG TARGETOS
ARG TARGETARCH
ARG BINARY_NAME=ssl-ref-client
WORKDIR work
COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -trimpath -ldflags="-w -s" -o /go/bin/${BINARY_NAME} ./cmd/${BINARY_NAME}

# Start fresh from a smaller image
FROM alpine:3@sha256:28bd5fe8b56d1bd048e5babf5b10710ebe0bae67db86916198a6eec434943f8b
ARG BINARY_NAME=ssl-ref-client
COPY --from=build_go /go/bin/${BINARY_NAME} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
