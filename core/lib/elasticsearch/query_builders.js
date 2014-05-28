/**
 * Builds a size object
 *
 * @param {Number} size
 * @return {Object}
 * @api public
 */

exports.buildSize = function(size) {
  return {size: size};
}

/**
 * Builds a filter object
 *
 * @param {Object} filter
 * @return {Object}
 * @api public
 */

exports.buildFilter = function(filter) {
  return {filter: filter}
}


/**
 * Builds a fuzzy like this query
 *
 * @param {Array} fields - fields to fuzzy match on
 * @param {String} text - text to fuzzy match on
 * @param {Number} maxQueryTerms - max number of query terms
 * @return {Object}
 * @api public
 */

exports.buildFuzzyLikeThis = function(fields, text, maxQueryTerms) {
  return {
    fuzzy_like_this: {
      fields: fields,
      like_text: text,
      max_query_terms: maxQueryTerms || 1
    }
  }
}


/**
 * Convience function for building a
 * range involving dates.
 *
 * @param {String} from
 * @param {String} to
 * @return {Object}
 * @api public
 */

exports.buildDateRange = function(from, to) {
  return buildRange('date', {from: from, to: to});
}


/**
 * Convience function for adding sorting info.
 *
 * @param {String} from
 * @param {String} to
 * @return {Object}
 * @api public
 */

exports.buildSort = function(field, order) {
  return {sort: buildSort(field, order)}
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
  return sort;
}