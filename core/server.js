var app
  , bodyParser = require('koa-body-parser')
  , config = requireRoot('core/config')
  , koa = require('koa')
  , koaqs = require('koa-qs')
  , router = require('koa-router')
  , routes = requireRoot('core/routes')
  , serve = require('koa-static');

app = koa();

koaqs(app);
app.use(serve(APP_ROOT + '/public'));
app.use(bodyParser());
app.use(router(app));
routes.register(app);

app.listen(config.port);
console.log("Application mounted on port " + config.port)
