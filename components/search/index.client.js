var Backbone = require('backbone');
Backbone.$ || (Backbone.$ = jQuery);

var Router = require('./router.client');

$(function(){
  new Router
});
