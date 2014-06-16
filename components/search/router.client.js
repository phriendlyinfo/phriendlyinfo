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
    form.on('submit', this.onSearchSubmit, this);

    this.results = new Results({model: Result});
    this.results.on('error', this.onSearchError, this);
    this.results.on('success', this.onSearchSuccess, this);

    this.resultsView = new ResultsView({
      el: $('#js-content')
    });
  },

  onSearchSubmit: function(search) {
    this.results.fetch(search);
  },

  onSearchError: function(results, xhr) {
    var error = xhr.responseJSON.error;

    if ('malformed search' == error)
      this.form.trigger('error');
    else
      this.resultsView.trigger('error');
  },

  onSearchSuccess: function(results) {
    this.resultsView.render(results);
  }
});
