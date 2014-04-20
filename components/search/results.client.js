var Collection = require('backbone').Collection
  , fetch = Collection.prototype.fetch;

module.exports = Collection.extend({
  url: '/search',

  fetch: function(search) {
    return fetch.call(this, {
      data: {query: search},
      reset: true,
      type: 'POST'
    });
  }
});
