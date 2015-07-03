var cfg = require('../../config');
var strava = require('strava-v3');
var _ = require('lodash');
var Joi = require('joi');

var validateId = Joi.number().integer().positive();

var terribleCache = {
  activity: []
};

var stravaCfg = {'access_token': cfg('stravaAccessToken')};

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/api/v1/activities',
    handler: function(req, rep) {
      if (terribleCache.activities) {
        console.log('serving from awful cache');
        return rep(terribleCache.activities);
      }

      strava.athlete.listActivities(stravaCfg, function(err, payload) {
        console.log('oh no hitting strava');
        var data = _.map(payload, function(activity) {
          return {id: activity.id, name: activity.name};
        });
        terribleCache.activities = data;
        rep(terribleCache.activities);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/v1/activities/{id}',
    handler: function(req, rep) {
      var id = parseInt(req.params.id, 10);

      if (terribleCache.activity[id]) {
        console.log('serving from awful cache');
        return rep(terribleCache.activity[id]);
      }
      var options = _.clone(stravaCfg);
      options.id = id;

      strava.activities.get(options, function(err, payload) {
        console.log('oh no hitting strava');
        console.log(err)
        var data = payload;
        terribleCache.activity[id] = data;
        rep(terribleCache.activity[id]);
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
  next();
}
exports.register.attributes = {
  pkg: require('./package.json')
};
