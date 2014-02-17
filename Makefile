dev:
	@node --harmony ./index.js

prod:
	@NODE_ENV=production node --harmony ./index.js
