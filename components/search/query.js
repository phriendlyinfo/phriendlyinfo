module.exports = toQuery;

var extend = require('underscore').extend
  , QueryBuilder = requireRoot('core/lib/elasticsearch/query_builders');

function toQuery(search) {
  var range = search.dateRange
    , qualifier = search.qualifier
    , sort = 'last' === qualifier.qualifier ? 'desc' : 'asc';

  return extend(
    QueryBuilder.buildSort('date', sort),
    QueryBuilder.buildSize(qualifier.arguments[0]),
    QueryBuilder.buildFilter(
      QueryBuilder.buildDateRange(range.from, range.to)
    )
  );
}
