var SearchController = requireController('search')
  , SearchMiddleware = requireRoot('components/search/middleware')

exports.register = function(app){
  app.post('/search', SearchMiddleware, SearchController.post);
}

function requireController(controller){
  return requireRoot('components/' + controller + '/controller.js');
}
