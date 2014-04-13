var SearchController = requireController('search');

exports.register = function(app){
  app.get('/search', SearchController.index);
  app.post('/search', SearchController.index);
}

function requireController(controller){
  return requireRoot('components/' + controller + '/controller.js');
}
