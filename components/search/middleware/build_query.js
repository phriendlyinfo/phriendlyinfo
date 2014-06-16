var toQuery = requireRoot('components/search/query');

/**
 * Transforms the parsed query into an
 * elasticsearch query. Also sets a "reverse"
 * flag to determine whether the result set
 * should be inverted.
 *
 * Swaps the parsed `ctx.request.body.query`
 * with the elasticsearch query.
 */

exports.buildQuery = function *(next) {
  var body = this.request.body
    , query = body.query
    , sort = query.sort
    , qualifier = query.qualifier.qualifier;

  body.reverse = 'last' === qualifier
    ? 'asc' === sort
    : 'desc' === sort;

  body.query = toQuery(query, body.page);
  yield next;
}
