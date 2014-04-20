var Backbone = require('backbone')
  , FormView = require('./views/form')
  , Result = require('./result.client')
  , Results = require('./results.client')
  , ResultsView = require('./views/results');

module.exports = Backbone.Router.extend({
  initialize: function() {
    var form = this.form = new FormView({
      el: $('#js-search-form-container')
    });

    form.render();
    form.on('submit', this.handleSubmit, this);

    this.results = new Results({
      model: Result
    });

    var resultsView = new ResultsView({
      el: $('#js-content')
    });

    this.results.on('reset', function(collection) {
      resultsView.render(collection.models);
    }, this)
  },

  handleSubmit: function(search) {
    this.results.fetch(search);
  }
});
