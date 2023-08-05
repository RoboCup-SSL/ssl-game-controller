CMDS = ssl-game-controller ssl-ref-client
DOCKER_TARGETS = $(addprefix docker-, $(CMDS))
.PHONY: all docker frontend install test run proto $(DOCKER_TARGETS)

all: install docker

docker: $(DOCKER_TARGETS)

$(DOCKER_TARGETS): docker-%:
	docker build -f ./cmd/$*/Dockerfile -t $*:latest .

.frontend: $(shell find frontend/ -type f -not -path "frontend/node_modules/*")
	cd frontend && \
	npm install && \
	npm run build && \
	touch ../.frontend

frontend: .frontend

install: frontend
	go install -v ./...

test: frontend
	go test ./...

run: frontend
	go run ./cmd/$(word 1,$(CMDS))

proto:
	tools/generateProto.sh

autoref-tests:
	git clone "https://gitlab.com/robocup-small-size/autoref-tests.git" autoref-tests
