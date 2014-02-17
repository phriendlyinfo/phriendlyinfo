var config = requireRoot('core/config')
  , ElasticSearch = require('elasticsearch');

module.exports = new ElasticSearch.Client(config.elasticsearch);
