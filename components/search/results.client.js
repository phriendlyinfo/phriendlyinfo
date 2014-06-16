var Collection = require('backbone').Collection
  , fetch = Collection.prototype.fetch;

module.exports = Collection.extend({
  url: '/search',

  initialize: function() {
    var self = this;
    self.on('reset', function(){
      self.trigger('success', self.toJSON());
    });
  },

  parse: function(response) {
    this.page = response.page;
    this.total = response.total;
    return response.hits;
  },

  fetch: function(search, page) {
    page = page || 0;
    return fetch.call(this, {
      data: {query: search, page: page},
      reset: true,
      type: 'POST'
    });
  },

  toJSON: function() {
    return {
      hits: this.models,
      page: this.page,
      total: this.total
    }
  }
});
