var cfg = require('../../config');
var strava = require('./strava');
var Joi = require('joi');

var validateId = Joi.number().integer().positive();

exports.register = function(server, options, next) {
  var defaultCache = {
    cache: {
      expiresIn: 5*60*1000
    }
  };

  server.method('athlete.listActivities', strava.listActivities, defaultCache);
  server.method('activities.get', strava.getActivity, defaultCache);
  server.method('streams.get', strava.getStream, defaultCache);

  server.route({
    method: 'GET',
    path: '/api/v1/activities',
    handler: function(req, rep) {
      server.methods.athlete.listActivities(function(err, data) {
        rep(data);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/v1/activities/{id}',
    handler: function(req, rep) {
      var id = parseInt(req.params.id, 10);
      server.methods.activities.get(id, function(err, data) {
        rep(data);
      });
    },
    config: {
      validate: {
        params: {
          id: validateId
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/v1/activities/{id}/streams',
    handler: function(req, rep) {
      var id = parseInt(req.params.id, 10);
      server.methods.streams.get(id, function(err, data) {
        rep(data);
      });
    },
    config: {
      validate: {
        params: {
          id: validateId
        }
      }
    }
  })
  next();
}
exports.register.attributes = {
  pkg: require('./package.json')
};
