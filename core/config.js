var config = requireRoot('core/config/index')[process.env.NODE_ENV || 'development']
  , elasticsearchConfig = requireRoot('core/config/elasticsearch')[process.env.NODE_ENV || 'development']
  , _ = require('underscore');

module.exports = _.extend(
  _.clone(config),
  {elasticsearch: _.clone(elasticsearchConfig)}
);
