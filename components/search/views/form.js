var Backbone = require('backbone')
  , Form = require('./react/form')
  , isEmpty = require('underscore').isEmpty;

module.exports = Backbone.View.extend({
  render: function() {
    React.renderComponent(Form({onSubmit: this.onSubmit.bind(this)}), this.$el[0]);
  },

  onSubmit: function(value) {
    if (isEmpty(value))
      console.log('empty');
    else
      this.trigger('submit', value);
  }
});
