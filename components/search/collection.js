module.exports = Collection;

function Collection(query, options) {
  options = options || {};
  if (!(this instanceof Collection))
    return new Collection(query, options);
  this.hits = [];
  this.total = null;
  this.query = query;
  this.page = options.page;
  this.fetch = this.fetch.bind(this);
}

Collection.prototype.toJSON = function() {
  return {hits: this.hits, page: this.page, total: this.total}
}

Collection.prototype.fetch = function(cb) {
  var self = this;
  execute(this.query, function(err, response, status) {
    if (null != err || status > 399) {
      cb(new Error('query exception'));
      return
    }
    self.total = response.hits.total;
    self.hits = self.parse(response);
    cb(null, self.toJSON());
  });
}

Collection.prototype.parse = function(res) {
  return res.hits.hits.map(function(hit){return hit._source});
}


/**
 * private
 */

var execute = (function(config, client) {
  var index = config.elasticsearch.index;
  return function(query, cb) {
    client.search({body: query, index: index}, cb);
  }
})(requireRoot('core/config'), requireRoot('core/lib/elasticsearch/client'));
