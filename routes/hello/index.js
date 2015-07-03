var cfg = require('../../config');

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/api/v1',
    handler: function(req, rep) {
      rep({
        message: 'Hello!',
        endpoints: [{
          'name': 'hello',
          'href': cfg('baseUrl') + '/api/v1'
        }]
      });
    }
  });
  next();
}
exports.register.attributes = {
  pkg: require('./package.json')
};
