FROM golang:1.23-alpine@sha256:b7486658b87d34ecf95125e5b97e8dfe86c21f712aa36fc0c702e5dc41dc63e1 AS build_go
ARG cmd=ssl-ref-client
WORKDIR work
COPY . .
RUN go install -v ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3@sha256:8a1f59ffb675680d47db6337b49d22281a139e9d709335b492be023728e11715
ARG cmd=ssl-ref-client
COPY --from=build_go /go/bin/${cmd} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
