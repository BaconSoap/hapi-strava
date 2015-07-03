exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/api/v1',
    handler: function(req, rep) {
      rep({
        message: 'Hello!'
      });
    }
  });
  next();
}
exports.register.attributes = {
  pkg: require('./package.json')
};
