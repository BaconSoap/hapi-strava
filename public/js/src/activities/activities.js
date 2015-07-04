(function() {
  var app = angular.module('hapi-strava.activities', ['hapi-strava.model.activities']);

  ActivitiesCtrl.$inject = ['ActivitiesSvc'];
  function ActivitiesCtrl(activitiesSvc) {
    this.activities = activitiesSvc.list();
  }

  app.controller('ActivitiesCtrl', ActivitiesCtrl);
})();
