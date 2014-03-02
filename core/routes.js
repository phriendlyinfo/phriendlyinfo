exports.register = function(app){
}

function requireController(controller){
  return requireRoot('components/' + controller + '/controller.js');
}
