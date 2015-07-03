var cfg = require('../../config');
var strava = require('strava-v3');
var _ = require('lodash');

var terribleCache;

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/api/v1/activities',
    handler: function(req, rep) {
      if (terribleCache) {
        console.log('serving from awful cache');
        return rep(terribleCache);
      }

      strava.athlete.listActivities({'access_token': cfg('stravaAccessToken')}, function(err, payload) {
        console.log('oh no hitting strava');
        var data = _.map(payload, function(activity) {
          return {id: activity.id, name: activity.name};
        });
        terribleCache = data;
        rep(terribleCache);
      });
    }
  });
  next();
}
exports.register.attributes = {
  pkg: require('./package.json')
};
