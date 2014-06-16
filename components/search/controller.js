var Collection = requireRoot('components/search/collection');

exports.post = post;

/**
 * POST /search
 */

function *post() {
  var body = this.request.body
    , query = body.query
    , reverse = body.reverse
    , collection = Collection(query, {page: body.page});

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
