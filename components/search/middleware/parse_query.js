var Parser = requireRoot('components/search/parser');

/**
 * Parses the raw user query into an object.
 *
 * Swaps the raw `ctx.request.body.query`
 * with the parsed query.
 */

exports.parseQuery = function *(next) {
  try {
    this.request.body.query = Parser.parse(this.request.body.query);
  } catch (e) {
    this.body = {error: 'malformed search'};
    this.status = 400;
    return
  }
  yield next;
}
