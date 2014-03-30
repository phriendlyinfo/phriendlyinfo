var isString = require('underscore').isString;

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
  if (!isString(str)) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(str);
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
