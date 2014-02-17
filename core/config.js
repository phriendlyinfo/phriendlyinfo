var config = requireRoot('core/config/index')[process.env.NODE_ENV || 'development']
  , elasticsearchConfig = requireRoot('core/config/elasticsearch')[process.env.NODE_ENV || 'development']
  , extend = require('underscore').extend;

module.exports = extend({}, config, {elasticsearch: elasticsearchConfig});
