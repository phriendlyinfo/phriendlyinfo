var config = requireRoot('core/config/index')[process.env.NODE_ENV || 'development']
  , elasticsearchConfig = requireRoot('core/config/elasticsearch')[process.env.NODE_ENV || 'development']
  , deepClone = require('lodash-node/modern/objects/cloneDeep')
  , extend = require('lodash-node/modern/objects/assign');

module.exports = extend(
  deepClone(config),
  {elasticsearch: deepClone(elasticsearchConfig)}
);
