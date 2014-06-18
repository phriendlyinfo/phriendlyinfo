var Backbone = require('backbone')
  , Result = require('./react/result')
  , Results = require('./react/results')
  , ResultHeader = require('./react/result_header');

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

    var props = {
      Header: ResultHeader,
      Result: Result,
      results: results
    };

    React.renderComponent(Results(props), this.$el[0]);
  },

  onError: function() {
    throw new Error('TODO: write me');
  }
});
