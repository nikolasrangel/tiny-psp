rebuild:
	@docker-compose build
.PHONY: rebuild

destroy:
	@docker-compose down -v --rmi local
.PHONY: destroy

server:
	@docker-compose up server
.PHONY: server

migrate:
	@docker-compose up migrate
.PHONY: migrate

seed:
	@docker-compose up seed
.PHONY: seed

start-postgres:
	@docker-compose up -d postgres
.PHONY: start-postgres

start-redis: 
	@docker-compose up -d redis
.PHONY: start-redis

setup-postgres-db: start-postgres migrate seed
.PHONY: setup-postgres-db
