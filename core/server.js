var app
  , koa = require('koa')
  , serve = require('koa-static')
  , router = require('koa-router')
  , config = requireRoot('core/config')
  , routes = requireRoot('core/routes');

app = koa();

app.use(serve(APP_ROOT + '/public'));
app.use(router(app));
routes.register(app);

app.listen(config.port);
console.log("Application mounted on port " + config.port)
