var client = requireRoot('core/lib/elasticsearch/client')
  , config = requireRoot('core/config').elasticsearch
  , Parser = requireRoot('components/search/parser')
  , toQuery = requireRoot('components/search/conversion').toQuery;

exports.index = function *(){
  yield 'GET' == this.method ? get : post;
}

function *get(){
  this.status = 'ok';
}

function *post(){
  var parsedSearch, response;

  try {
    parsedSearch = Parser.parse(this.request.body.query);
  } catch (e) {
    this.body = createError(e, 'Unable to parse search');
    this.status = 'bad request';
    return
  }

  try {
    var query = toQuery(parsedSearch);
    response = yield perform.bind(null, query);
  } catch(e) {
    this.body = createError(e, 'Error while performing query');
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

function createError(exception, message) {
  var error = new Error(message);
  error.exception = exception
  error.exceptionMessage = exception.message
  return error;
}
