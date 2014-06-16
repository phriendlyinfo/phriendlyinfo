module.exports = toQuery;

const DEFAULT_PAGE_SIZE = requireRoot('core/config').search.DEFAULT_SIZE;

var extend = require('underscore').extend
  , QueryBuilder = requireRoot('core/lib/elasticsearch/query_builders');

function toQuery(search, page) {
  var at = search.at
    , from = calculateOffset(page)
    , range = search.dateRange
    , qualifier = search.qualifier
    , sort = 'last' === qualifier.qualifier ? 'desc' : 'asc'
    , query;

  query = extend(
    QueryBuilder.buildSort('date', sort),
    QueryBuilder.buildSize({size: qualifier.arguments[0], from: from}),
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

function calculateOffset(page) {
  return DEFAULT_PAGE_SIZE * page;
}
