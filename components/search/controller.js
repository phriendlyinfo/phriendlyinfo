var client = requireRoot('core/lib/elasticsearch/client')
  , config = requireRoot('core/config').elasticsearch
  , toQuery = requireRoot('components/search/conversion').toQuery;

exports.index = function *(){
  yield 'GET' == this.method ? get : post;
}

function *get(){
  this.status = 'ok';
}

function *post(){
  var query = toQuery(this.request.body)
    , response;

  try {
    response = yield perform.bind(null, query);
  } catch(e) {
    this.body = {error: e.message};
    this.status = 'internal server error';
    return
  }

  this.body = present(response[0]);
  this.status = 'ok';
}

function perform(query, cb){
  client.search({index: config.index, body: query}, cb);
}

function present(response){
  return response.hits.hits.map(function(hit){
    return hit._source;
  });
}
