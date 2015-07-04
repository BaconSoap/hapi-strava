
(function() {
  var app = angular.module('hapi-strava.activity', ['hapi-strava.model.activities']);

  ActivityCtrl.$inject = ['ActivitiesSvc', 'activity'];
  function ActivityCtrl(activitiesSvc, activity) {
    this.activity = activity;
    setTimeout(function() {
      showMap(activity.id, activity.map.summary_polyline)
    }, 0);
  }

  app.controller('ActivityCtrl', ActivityCtrl);
})();
