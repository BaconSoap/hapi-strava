var cfg = require('../../config');
var strava = require('strava-v3');
var _ = require('lodash');

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/api/v1/activities',
    handler: function(req, rep) {
      strava.athlete.listActivities({'access_token': cfg('stravaAccessToken')}, function(err, payload) {
        var data = _.map(payload, function(activity) {
          return {id: activity.id, name: activity.name};
        });
        rep(data)
      });
    }
  });
  next();
}
exports.register.attributes = {
  pkg: require('./package.json')
};
