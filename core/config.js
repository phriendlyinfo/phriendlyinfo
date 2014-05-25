var env = process.env.NODE_ENV || 'development'
  , config = requireRoot('core/config/index')[env];

config.elasticsearch = requireRoot('core/config/elasticsearch')[env];

module.exports = Object.freeze(config);
