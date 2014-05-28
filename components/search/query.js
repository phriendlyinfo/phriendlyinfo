module.exports = toQuery;

var extend = require('underscore').extend
  , QueryBuilder = requireRoot('core/lib/elasticsearch/query_builders');

function toQuery(search) {
  var at = search.at
    , range = search.dateRange
    , qualifier = search.qualifier
    , sort = 'last' === qualifier.qualifier ? 'desc' : 'asc'
    , query;

  query = extend(
    QueryBuilder.buildSort('date', sort),
    QueryBuilder.buildSize(qualifier.arguments[0]),
    QueryBuilder.buildFilter(
      QueryBuilder.buildDateRange(range.from, range.to)
    )
  );

  if (null != at)
    extend(query, {query: buildVenueQuery(at)});

  return query;
}

function buildVenueQuery(at) {
  return QueryBuilder.buildFuzzyLikeThis(["venue.name"], at);
}
