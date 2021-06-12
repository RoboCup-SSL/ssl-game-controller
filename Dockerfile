FROM node:15.7.0-alpine3.11 AS build_node
WORKDIR /tmp/ssl-game-controller
COPY . .
RUN yarn install
RUN yarn build

FROM golang:1.16-alpine AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-game-controller
COPY . .
COPY --from=build_node /tmp/ssl-game-controller/dist dist
RUN go get -v -t -d ./...
RUN go get -v github.com/gobuffalo/packr/packr
WORKDIR cmd/ssl-game-controller
RUN GOOS=linux GOARCH=amd64 packr build -o ../../release/ssl-game-controller_linux_amd64

# Start fresh from a smaller image
FROM alpine:3.9
COPY --from=build_go /go/src/github.com/RoboCup-SSL/ssl-game-controller/release/ssl-game-controller_linux_amd64 /app/ssl-game-controller
COPY config config
RUN chown -R 1000: config
USER 1000
EXPOSE 8081 10007 10008 10011 10009
ENTRYPOINT ["/app/ssl-game-controller", "-address", ":8081"]
CMD []
