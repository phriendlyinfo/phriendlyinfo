var Backbone = require('backbone')
  , FormView = require('./views/form')
  , Parser = require('./parser')
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
    try {
      var parsedSearch = Parser.parse(search);
    } catch (e) {
      this.form.trigger('error', {message: 'malformed search', error: e.message});
      return
    }

    this.results.fetch(parsedSearch);
  }
});
