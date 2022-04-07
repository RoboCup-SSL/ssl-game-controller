FROM node:16.14-alpine3.15 AS build_node
WORKDIR /tmp/ssl-game-controller
COPY . .
RUN yarn install
RUN yarn build

FROM golang:1.18-alpine3.15 AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY . .
COPY --from=build_node /tmp/ssl-game-controller/internal/app/ui/dist internal/app/ui/dist
RUN go install -v ./cmd/ssl-game-controller

# Start fresh from a smaller image
FROM alpine:3.15
COPY --from=build_go /go/bin/ssl-game-controller /app/ssl-game-controller
COPY config config
RUN chown -R 1000: config
USER 1000
EXPOSE 8081 10007 10008 10011 10009
ENTRYPOINT ["/app/ssl-game-controller", "-address", ":8081"]
CMD []
