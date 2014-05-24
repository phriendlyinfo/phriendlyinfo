var content = /\S+/
  , isString = require('underscore').isString;

/**
 * Validates that the request contains a
 * non-blank query field.
 */

exports.enforceQuery = function *(next) {
  var query = this.request.body.query;
  if (isString(query) && null != content.exec(query))
    yield next;
  else {
    this.body = {error: 'query is required'};
    this.status = 'bad request';
  }
}
