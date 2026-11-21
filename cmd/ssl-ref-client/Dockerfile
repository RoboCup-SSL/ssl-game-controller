FROM --platform=$BUILDPLATFORM golang:1.27-alpine@sha256:70bd7ddea8b6cbe5d6943cde279d6b67feb10cc924fb9100d1d8757c1575b280 AS build_go
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
FROM alpine:3@sha256:f59abe656b692d901e184be3445e084786602108599d2a51d229c0f5a48c71bf
ARG BINARY_NAME=ssl-ref-client
COPY --from=build_go /go/bin/${BINARY_NAME} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
