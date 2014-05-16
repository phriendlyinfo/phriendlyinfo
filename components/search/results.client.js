var Collection = require('backbone').Collection
  , fetch = Collection.prototype.fetch;

module.exports = Collection.extend({
  url: '/search',

  initialize: function() {
    var self = this;
    self.on('reset', function(){
      self.trigger('success', {total: self.total, hits: self.models});
    });
  },

  parse: function(response) {
    this.total = response.total;
    return response.hits;
  },

  fetch: function(search) {
    return fetch.call(this, {
      data: {query: search},
      reset: true,
      type: 'POST'
    });
  }
});
