var Collection = requireRoot('components/search/collection');

exports.post = post;

/**
 * POST /search
 */

function *post() {
  var query = this.request.body.query
    , reverse = this.request.body.reverse
    , collection = Collection(query);

  try {
    yield collection.fetch;
    if (reverse)
      collection.hits.reverse();
    this.body = collection.toJSON();
  } catch(e) {
    this.status = 500;
    this.body = {error: e.message};
  }
}
