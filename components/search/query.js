module.exports = Query;

var DateUtils = requireRoot('core/lib/utils/date')
  , extend = require('underscore').extend
  , QueryBuilder = requireRoot('core/lib/elasticsearch/query_builders');

function Query(search) {
  if (!(this instanceof Query))
    return new Query(search);
  this.qualifier = search.qualifier;
  this.dateRange = search.dateRange;
}

Object.defineProperties(Query, {
  'DEFAULT_SIZE': {enumerable: true, value: 20},
  'EARLIEST_DATE': {enumerable: true, value: '1983-01-01'}
});

Query.prototype.toQuery = function() {
  var range = this.getDateRange();
  return extend(
    QueryBuilder.buildSort('date', this.getSort()),
    QueryBuilder.buildSize(this.getSize()),
    QueryBuilder.buildFilter(
      QueryBuilder.buildDateRange(range.from, range.to)
    )
  );
}

Query.prototype.getDateRange = function() {
  var from = this.dateRange[0]
    , to = this.dateRange[1];

  if (from && !to) {
    from = DateUtils.parse(from);
    to = DateUtils.increment(from, {year: 1});
  } else if (from && to) {
    from = DateUtils.parse(from);
    to = DateUtils.parse(to);
  } else {
    from = DateUtils.parse(Query.EARLIEST_DATE);
    to = DateUtils.parse((new Date).getFullYear().toString());
  }

  return {from: DateUtils.canonicalDate(from), to: DateUtils.canonicalDate(to)};
}

Query.prototype.getSize = function() {
  var args = this.qualifier.arguments
    , qualifier = this.qualifier.qualifier;
  return null != args[0]
    ? +args[0]
    : 'all' === qualifier ? Query.DEFAULT_SIZE : 1;
}

Query.prototype.getSort = function() {
  return 'last' === this.qualifier.qualifier ? 'desc' : 'asc';
}