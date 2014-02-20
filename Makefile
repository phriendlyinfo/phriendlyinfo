default: test

BIN = node_modules/.bin
NODE = node --harmony
MOCHA = $(BIN)/mocha
PEGJS = $(BIN)/pegjs --export-var 'module.exports'
JS_ASSETS = app/assets/js

db-recreate: db-delete db-migrate db-seed

db-delete:
	@$(NODE) scripts/db/delete

db-migrate:
	@$(NODE) scripts/db/migrate

db-seed:
	@$(NODE) scripts/db/seed $(SEED_PATH)

dev:
	@$(NODE) index.js

prod:
	@NODE_ENV=production $(NODE) index.js

build: build-parser

build-parser:
	@$(PEGJS) $(JS_ASSETS)/search_grammer.pegjs $(JS_ASSETS)/search_parser.js

test: build
	@$(MOCHA) --reporter spec --recursive --colors --harmony-generators

.PHONY: test dev prod db-seed db-migrate db-recreate db-delete build build-parser
