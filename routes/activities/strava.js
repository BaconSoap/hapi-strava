var cfg = require('../../config');
var _ = require('lodash');
var strava = require('strava-v3');

var stravaCfg = {'access_token': cfg('stravaAccessToken')};

function listActivities(next) {
  strava.athlete.listActivities(stravaCfg, function(err, payload) {
    var data = _.map(payload, function(activity) {
      return {id: activity.id, name: activity.name, summary: activity.map.summary_polyline};
    });
    next(null, data);
  });
}

function getActivity(id, next) {
  var options = _.clone(stravaCfg);
  options.id = id;
  strava.activities.get(options, function(err, payload) {
    var data = payload;
    next(null, data);
  });
}

module.exports = {
  listActivities: listActivities,
  getActivity: getActivity
};
