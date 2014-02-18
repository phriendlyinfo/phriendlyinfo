NODE = node --harmony

db-recreate: db-delete db-migrate db-seed

db-delete:
	@$(NODE) ./scripts/db/delete

db-migrate:
	@$(NODE) ./scripts/db/migrate

db-seed:
	@$(NODE) ./scripts/db/seed $(SEED_PATH)

dev:
	@$(NODE) ./index.js

prod:
	@NODE_ENV=production $(NODE) ./index.js
