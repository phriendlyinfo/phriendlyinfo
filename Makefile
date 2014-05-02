default: test

BIN = node_modules/.bin
CJSIFY = $(BIN)/cjsify --no-node
JSX = $(BIN)/jsx --no-cache-dir -x jsx
NODE = node --harmony
MOCHA = $(BIN)/mocha
JISON = $(BIN)/jison

db-recreate: db-delete db-migrate db-seed

db-delete:
	@$(NODE) scripts/db/delete

db-migrate:
	@$(NODE) scripts/db/migrate

db-seed:
	@$(NODE) scripts/db/seed $(SEED_PATH)

dev: build
	@$(NODE) index.js

prod: build
	@NODE_ENV=production $(NODE) index.js

build: build-parser build-views bundle
build-for-test: build-parser

build-parser:
	$(JISON) components/search/grammar.jison components/search/grammar.jisonlex -m commonjs -o components/search/parser.js

build-views:
	@for component in $(shell ls components) ; do \
	  $(JSX) components/$$component/views/react components/$$component/views/react ; \
	done

bundle:
	@$(CJSIFY) components/search/index.client.js -o public/js/main.js

test: build-for-test
	@$(MOCHA) --reporter spec --recursive --colors --harmony-generators

.PHONY: test dev prod db-seed db-migrate db-recreate db-delete build build-parser build-views bundle
