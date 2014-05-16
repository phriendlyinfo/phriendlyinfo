var Backbone = require('backbone')
  , Results = require('./react/results');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.on('error', this.onError, this);
  },

  render: function(results){
    React.renderComponent(Results({results: results.hits}), this.$el[0]);
  },

  onError: function() {
    throw new Error('TODO: write me');
  }
});