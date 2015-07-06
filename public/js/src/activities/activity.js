
(function() {
  var app = angular.module('hapi-strava.activity', ['hapi-strava.model.activities']);

  ActivityCtrl.$inject = ['ActivitiesSvc', 'activity'];
  function ActivityCtrl(activitiesSvc, activity) {
    this.activitiesSvc = activitiesSvc;
    this.activity = activity;
    this.segments = _.map(activity.segment_efforts, function(e) {
      return {
        id: e.id,
        name: e.name,
        startIndex: e.start_index,
        endIndex: e.end_index,
        temporal: {
          moving: e.moving_time
        }
      };
    });
  }

  ActivityCtrl.prototype.segmentClick = function(seg) {
    var that = this;
    this.activitiesSvc.getStreams(this.activity).then(function(stream) {
      var latLngs = stream.data.slice(seg.startIndex, seg.endIndex + 1);
      that.highlighted = latLngs
    })
  }

  app.controller('ActivityCtrl', ActivityCtrl);
})();
