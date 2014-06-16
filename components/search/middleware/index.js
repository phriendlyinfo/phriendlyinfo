var compose = require('koa-compose');

module.exports = compose([
  requireRoot('components/search/middleware/enforce_query').enforceQuery,
  requireRoot('components/search/middleware/parse_query').parseQuery,
  requireRoot('components/search/middleware/parse_page').parsePage,
  requireRoot('components/search/middleware/build_query').buildQuery
]);
