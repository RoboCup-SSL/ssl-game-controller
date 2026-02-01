FROM node:22-alpine@sha256:b2358485e3e33bc3a33114d2b1bdb18cdbe4df01bd2b257198eb51beb1f026c5 AS build_node
COPY frontend frontend
WORKDIR frontend
RUN npm install
RUN npm run build

FROM --platform=$BUILDPLATFORM golang:1.25-alpine@sha256:d3f0cf7723f3429e3f9ed846243970b20a2de7bae6a5b66fc5914e228d831bbb AS build_go
ARG TARGETOS
ARG TARGETARCH
ARG BINARY_NAME=ssl-game-controller
WORKDIR work
COPY . .
COPY --from=build_node frontend/dist frontend/dist
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -trimpath -ldflags="-w -s" -o /go/bin/${BINARY_NAME} ./cmd/${BINARY_NAME}

# Start fresh from a smaller image
FROM alpine:3@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412
ARG BINARY_NAME=ssl-game-controller
COPY --from=build_go /go/bin/${BINARY_NAME} /app
RUN mkdir -p /config && chown -R 1000: /config
USER 1000
ENTRYPOINT ["/app"]
CMD []
