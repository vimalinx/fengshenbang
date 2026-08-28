SHELL := /usr/bin/env bash

.PHONY: init config seed build up bootstrap start status smoke backup verify-live down validate

init:
	./scripts/init-env.sh

config: init
	docker compose --env-file .env -f compose.yaml config --quiet

seed:
	python3 scripts/generate-import.py --repo .. --output generated/seed

build: config
	docker compose --env-file .env -f compose.yaml build web

up: build
	docker compose --env-file .env -f compose.yaml up -d db web caddy

bootstrap: seed up
	docker compose --env-file .env -f compose.yaml --profile tools run --rm bootstrap

start: bootstrap

status:
	docker compose --env-file .env -f compose.yaml ps

smoke:
	python3 scripts/smoke-moderation.py --wiki-dir .

backup:
	./scripts/backup.sh

verify-live:
	./scripts/verify-live.sh

down:
	docker compose --env-file .env -f compose.yaml down

validate:
	python3 scripts/validate-stack.py --wiki-dir . --repo ..
	docker compose --env-file .env -f compose.yaml config --quiet
