var Backbone = require('backbone')
  , Results = require('./react/results');

module.exports = Backbone.View.extend({
  render: function(results){
    React.renderComponent(Results({results: results}), this.$el[0]);
  }
});