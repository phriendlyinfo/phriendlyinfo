var config = requireRoot('core/config/index');

module.exports = config[process.env.NODE_ENV || 'development']
