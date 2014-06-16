var Backbone = require('backbone')
  , Results = require('./react/results');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.on('error', this.onError, this);
  },

  render: function(results){
    var results = {
      page: results.page,
      total: results.total,
      results: results.hits
    };
    React.renderComponent(Results(results), this.$el[0]);
  },

  onError: function() {
    throw new Error('TODO: write me');
  }
});