SHELL := /usr/bin/env bash

.PHONY: init config seed build up bootstrap start status permissions smoke backup verify-live verify-offsite verify-production trial-observe qualify qualify-restore release-bundle browser-e2e email-e2e setup-2fa setup-abuse-filter down validate

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

permissions:
	@set -a; source .env; set +a; python3 scripts/verify-permissions.py --url "$$WIKI_PUBLIC_URL"

smoke:
	python3 scripts/smoke-moderation.py --wiki-dir .

backup:
	./scripts/backup.sh

verify-live:
	./scripts/verify-live.sh

verify-offsite:
	./scripts/verify-offsite-backup.sh

verify-production:
	./scripts/verify-production-ready.sh "$${SSH_HOST:-newserver}"

trial-observe:
	./scripts/public-trial-check.sh "$${SSH_HOST:-newserver}"

qualify:
	./scripts/qualify-release.sh

qualify-restore:
	./scripts/qualify-release.sh --full-restore

release-bundle:
	./scripts/build-release.sh

browser-e2e:
	./scripts/browser-e2e.sh "$${SSH_HOST:-newserver}"

email-e2e:
	./scripts/email-e2e.sh "$${SSH_HOST:-newserver}" "$${WIKI_TEST_EMAIL:-agent@vimalinx.com}"

setup-2fa:
	./scripts/setup-2fa.sh "$${SSH_HOST:-newserver}"

setup-abuse-filter:
	./scripts/setup-abuse-filter.sh "$${SSH_HOST:-newserver}"

down:
	docker compose --env-file .env -f compose.yaml down

validate:
	python3 scripts/validate-stack.py --wiki-dir . --repo ..
	docker compose --env-file .env -f compose.yaml config --quiet
