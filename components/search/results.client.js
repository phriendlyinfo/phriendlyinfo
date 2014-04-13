var Collection = require('backbone').Collection
  , fetch = Collection.prototype.fetch;

module.exports = Collection.extend({
  url: '/search',

  fetch: function(parsedSearch) {
    return fetch.call(this, {
      data: parsedSearch,
      reset: true,
      type: 'POST'
    });
  }
});
