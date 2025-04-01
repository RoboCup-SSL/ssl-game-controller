FROM node:20-alpine@sha256:24fb6aa7020d9a20b00d6da6d1714187c45ed00d1eb4adb01395843c338b9372 AS build_node
COPY frontend frontend
WORKDIR frontend
RUN npm install
RUN npm run build

FROM golang:1.23-alpine@sha256:e438c135c348bd7677fde18d1576c2f57f265d5dfa1a6b26fca975d4aa40b3bb AS build_go
ARG cmd=ssl-game-controller
WORKDIR work
COPY . .
COPY --from=build_node frontend/dist frontend/dist
RUN go install ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3@sha256:a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c
ARG cmd=ssl-game-controller
COPY --from=build_go /go/bin/${cmd} /app
RUN mkdir -p /config && chown -R 1000: /config
USER 1000
ENTRYPOINT ["/app"]
CMD []
