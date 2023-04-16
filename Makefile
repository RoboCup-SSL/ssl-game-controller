.PHONY: all ssl-game-controller-docker ssl-ref-client-docker docker frontend test install proto

all: install docker

docker-ssl-game-controller:
	docker build -f ./cmd/ssl-game-controller/Dockerfile -t ssl-game-controller:latest .

docker-ssl-ref-client:
	docker build -f ./cmd/ssl-ref-client/Dockerfile -t ssl-ref-client:latest .

docker: docker-ssl-game-controller docker-ssl-ref-client

.frontend: $(shell find frontend/ -type f)
	cd frontend && \
	npm install && \
	npm run build && \
	touch ../.frontend

frontend: .frontend

test: frontend
	go test ./...

install: frontend
	go install -v ./...

proto:
	tools/generateProto.sh
