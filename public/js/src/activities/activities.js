(function() {
  var app = angular.module('hapi-strava.activities', ['hapi-strava.model.activities']);

  ActivitiesCtrl.$inject = ['activities'];
  function ActivitiesCtrl(activities) {
    var vm = this;
    vm.activities = activities;
  }

  app.controller('ActivitiesCtrl', ActivitiesCtrl);
})();
