FROM --platform=$BUILDPLATFORM golang:1.25-alpine@sha256:f6751d823c26342f9506c03797d2527668d095b0a15f1862cddb4d927a7a4ced AS build_go
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
FROM alpine:3@sha256:25109184c71bdad752c8312a8623239686a9a2071e8825f20acb8f2198c3f659
ARG BINARY_NAME=ssl-ref-client
COPY --from=build_go /go/bin/${BINARY_NAME} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
