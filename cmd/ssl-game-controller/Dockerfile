FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS build_node
COPY frontend frontend
WORKDIR frontend
RUN npm install
RUN npm run build

FROM --platform=$BUILDPLATFORM golang:1.27-alpine@sha256:70bd7ddea8b6cbe5d6943cde279d6b67feb10cc924fb9100d1d8757c1575b280 AS build_go
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
FROM alpine:3@sha256:f59abe656b692d901e184be3445e084786602108599d2a51d229c0f5a48c71bf
ARG BINARY_NAME=ssl-game-controller
COPY --from=build_go /go/bin/${BINARY_NAME} /app
RUN mkdir -p /config && chown -R 1000: /config
USER 1000
ENTRYPOINT ["/app"]
CMD []
