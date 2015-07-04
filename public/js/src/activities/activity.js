
(function() {
  var app = angular.module('hapi-strava.activity', ['hapi-strava.model.activities']);

  ActivityCtrl.$inject = ['ActivitiesSvc', 'activity'];
  function ActivityCtrl(activitiesSvc, activity) {
    this.activity = activity;
  }

  app.controller('ActivityCtrl', ActivityCtrl);
})();
