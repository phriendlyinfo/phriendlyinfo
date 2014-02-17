var Path = require('path');

global.APP_ROOT = Path.normalize(__dirname + '/..');
global.requireRoot = function(path) {
  return require(Path.join(APP_ROOT, path));
}