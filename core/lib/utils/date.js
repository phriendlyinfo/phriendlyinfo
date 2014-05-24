var isString = require('underscore').isString
  , extend = require('underscore').extend;

/**
 * Cached RegExp for matching against stringified
 * dates.
 *
 * The padding is optional for the month and day fields,
 * i.e. 2012-8-1 is the same as 2012-08-01.
 */

var dateRegEx = /^(\d{4})(-(\d{1,2})-(\d{1,2}))?$/;


/**
 * Parse a date string in the format YYYY, YYYY-MM-DD or YYYY-M-D.
 *
 * @param {String} str
 * @return {Date}
 * @api public
 */

exports.parse = function(str) {
  var match = dateRegEx.exec(str);
  if (!match) throw new Error('Unable to parse date string ' + str);
  var year = +match[1]
    , month = null != match[3] ? +match[3] : 0
    , day = null != match[4] ? +match[4] : 1;
  if (month > 0) month -= 1;
  return new Date(year, month, day);
}


/**
 * Takes a Date object and increments it by
 * the corresponding options provided.
 *
 * Options can have `year`, `month`, or `day` properties,
 * which are integers which represent the increment amount.
 *
 * @param {String} str
 * @return {Boolean}
 * @api public
 */

exports.increment = function(date, options) {
  options = extend({year: 0, month: 0, day: 0}, options || {});
  return new Date(
    date.getUTCFullYear() + options.year,
    date.getUTCMonth() + options.month,
    date.getUTCDate() + options.day
  );
}


/**
 * Returns true if argument is a string
 * and in the form of 'DDDD-DD-DD', false
 * otherwise.
 *
 * @param {String} str
 * @return {Boolean}
 * @api public
 */

exports.isCanonicalDate = function(str){
  return isString(str) && /^\d{4}-\d{2}-\d{2}$/.test(str);
}

 /**
  * Returns a stringified date
  * formatted as YYYY-MM-DD.
  *
  *     canonicalDate()
  *     // => "2014-03-02"
  *
  * @param {Date} date
  * @return {String}
  * @api public
  */

exports.canonicalDate = function(date){
  date = date || new Date(Date.now());
  return [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  ].map(pad).join('-');
}


/**
 * Pads an integer less than 10 with
 * a leading 0; returns the stringified
 * Number.
 *
 *     pad(7)
 *     // => "07"
 *     pad(24)
 *     // => "24"
 *
 * @param {Number|String} i
 * @return {String}
 * @api private
 */

function pad(i){
  return +i < 10 ? '0' + i : i.toString();
}
