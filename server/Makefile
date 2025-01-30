PWD=$(shell pwd)
UID=$(shell id -u)
GID=$(shell id -g)

ci_registry      := gitlab.ryansg.dev:4567
mnt              := /mount
node_version     := 20
docker_run_image := docker run -it --rm -p 8080:8080 -v "$(PWD)/":$(mnt) --user $(UID):$(GID) --workdir=$(mnt) $(ci_registry)

# This is a new image used to build the code (compile the TypeScript using Node 20)
appmnt            := /usr/src/app
docker_build_image := docker run -it --rm -p 8080:8080 \
								--network host \
                                 -v "$(PWD)/":$(appmnt) \
								 -v /gcp/config/logs \
								 --env PUBSUB_EMULATOR_HOST=localhost:8043 \
								 --env PUBSUB_PROJECT_ID=abc \
								 --workdir=$(appmnt) $(ci_registry)

# Use this image if you are not using the PubSub emulator
docker_standalone_image := docker run -it --rm -p 8080:8080 \
								--network host \
								-v "$(PWD)/":$(appmnt) \
								-v /gcp/config/logs \
								-v "$(HOME)/.config/gcloud:/gcp/config:ro" \
								--env GOOGLE_APPLICATION_CREDENTIALS=/gcp/config/application_default_credentials.json \
								--workdir=$(appmnt) $(ci_registry)

.DEFAULT_GOAL := build

.PHONY: clean
clean:
	rm -rf build

.PHONY: setup
setup:
	$(docker_build_image)/devops/docker-registry-cache/node:$(node_version) npm i
	mkdir -p build/config
	cp .env build/

.PHONY: build
build:
	$(docker_build_image)/devops/docker-registry-cache/node:$(node_version) npx tsc --build tsconfig.json

.PHONY: build-local
build-local:
	npx tsc --build tsconfig.json

.PHONY: test
test:
	npm test

.PHONY: check
check: eslint test

.PHONY: eslint
eslint:
	$(docker_run_image)/devops/docker-gts eslint --ext .ts src/

.PHONY: eslint-fix
eslint-fix:
	$(docker_run_image)/devops/docker-gts eslint --fix --ext .ts src/

.PHONY: check-format
check-format:
	npx prettier --check src/ resources/

.PHONY: format
format:
	npx prettier --write src/ resources/

.PHONY: build run
run: build start

.PHONY: build run-standalone
run-standalone: build start-standalone

.PHONY: build run-local
run-local: build-local start-local

# Run the function locally using Node 20 via a docker container
.PHONY: start
start:
	$(docker_build_image)/devops/docker-registry-cache/node:$(node_version) npm start

# Run the function locally using Node 20 via a docker container
.PHONY: start-standalone
start-standalone:
	$(docker_standalone_image)/devops/docker-registry-cache/node:$(node_version) npm start

.PHONY: start-local
start-local:
	node_modules/.bin/functions-framework --target=main

.PHONY: call
call:
	cat resources/test-main-topic-message.json | curl -X POST localhost:8080 -H 'Content-Type: application/json' --data-binary @-

.PHONY: call-qs
call-qs:
	cat resources/sample-quote-server-message.json | curl -X POST localhost:8091 -H 'Content-Type: application/json' --data-binary @-
