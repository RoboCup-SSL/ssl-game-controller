FROM node:20-alpine@sha256:d3507a213936fe4ef54760a186e113db5188472d9efdf491686bd94580a1c1e8 AS build_node
COPY frontend frontend
WORKDIR frontend
RUN npm install
RUN npm run build

FROM golang:1.24-alpine@sha256:68932fa6d4d4059845c8f40ad7e654e626f3ebd3706eef7846f319293ab5cb7a AS build_go
ARG cmd=ssl-game-controller
WORKDIR work
COPY . .
COPY --from=build_node frontend/dist frontend/dist
RUN go install ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3@sha256:8a1f59ffb675680d47db6337b49d22281a139e9d709335b492be023728e11715
ARG cmd=ssl-game-controller
COPY --from=build_go /go/bin/${cmd} /app
RUN mkdir -p /config && chown -R 1000: /config
USER 1000
ENTRYPOINT ["/app"]
CMD []
