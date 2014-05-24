var Query = requireRoot('components/search/query');

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
  var query = this.request.body.query
    , sort = query.sort
    , qualifier = query.qualifier.qualifier;

  this.request.body.reverse = 'last' === qualifier
    ? 'asc' === sort
    : 'desc' === sort;

  this.request.body.query = Query(query).toQuery();
  yield next;
}
