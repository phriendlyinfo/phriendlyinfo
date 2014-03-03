var $commands, $filters, $qualifiers
  , _ = require('underscore')
  , extend = _.extend
  , canonicalDate = requireRoot('core/lib/utils/date').canonicalDate;

$commands = {};
$commands['shows'] = $commands['show'] = buildShowQuery;

$filters = {
  in: buildInFilter,
  sort: buildSortFilter
}

$qualifiers = {
  first: buildFirstQualifier,
  last: buildLastQualifier
}


/**
 * Converts a parsed search object
 * into an elasticsearch query.
 *
 * @param {Object} search
 * @return {Object}
 * @api public
 */

exports.toQuery = function(search){
  return $commands[search.command](search);
}


/**
 * Creates a default skeleton query to
 * be merged over.
 *
 * @return {Object}
 * @api private
 */

function buildDefaultQuery(){
  return {
    filter: buildDateRange(),
    size: 20,
    sort: buildSort('date')
  }
}


/**
 * Converts a show search
 * into an elasticsearch query.
 *
 * @param {Object} search
 * @return {Object}
 * @api private
 */

function buildShowQuery(search){
  var filters = search.filters || []
    , qualifier = search.qualifier || {}
    , query;

  query = filters.map(function(filter){
    return $filters[filter.filter](filter);
  });

  if ($qualifiers[qualifier.qualifier])
    query.push($qualifiers[qualifier.qualifier](qualifier));

  return query.reduce(function(query, clause){
    return extend(query, clause);
  }, buildDefaultQuery());
}


/**
 * Sets `size` to 1
 *
 * @return {Object}
 * @api private
 */

function buildFirstQualifier(qualifier){
  return {size: +qualifier.arguments[0] || 1}
}


/**
 * Sets `size` to 1,
 * sort `order` to 'desc'
 *
 * @return {Object}
 * @api private
 */

function buildLastQualifier(qualifier){
  return {
    size: +qualifier.arguments[0] || 1,
    sort: buildSort('date', 'desc')
  }
}


/**
 * Builds an object for the `in` filter
 *
 * @param {Object} filter
 * @return {Object}
 * @api private
 */

function buildInFilter(filter){
  var year = filter.arguments[0]
    , from = canonicalDate(new Date(year), 0)
    , to = canonicalDate(new Date(+year + 1, 0));
  return {filter: buildDateRange(from, to)};
}


/**
 * Builds an object for the `sort` filter
 *
 * @param {Object} filter
 * @return {Object}
 * @api private
 */

function buildSortFilter(filter){
  return buildSort('date', filter.sort);
}


/**
 * Builds a date range. If either
 * `from` or `to` are left out, it
 * defaults them to the earliest possible
 * date (1983-01-01) and the current date,
 * respectfully.
 *
 *
 * @param {String} from
 * @param {String} to
 * @return {Object}
 * @api private
 */

function buildDateRange(from, to) {
  return buildRange('date', {
    from: (from || '1983-01-01'),
    to: to || canonicalDate()
  });
}


/**
 * Builds a range object.
 *
 * @param {String} field
 * @param {Object} attrs
 * @return {Object}
 * @api private
 */

function buildRange(field, attrs){
  var range = {range: {}};
  range.range[field] = attrs;
  return range;
}


/**
 * Builds a sort object. Order is
 * 'asc' by default.
 *
 *     buildSort('date', 'desc')
 *     // => {date: {order: 'desc'}}
 *
 * @param {String} field
 * @param {String} order
 * @return {Object}
 * @api private
 */

function buildSort(field, order) {
  var sort = {};
  sort[field] = {order: order || 'asc'}
  return [sort];
}
