exports.register = function(app){
}

function requireController(controller){
  return requireRoot("app/controllers/" + controller);
}
