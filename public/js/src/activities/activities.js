(function() {
  var app = angular.module('hapi-strava.activities', ['hapi-strava.model.activities']);

  ActivitiesCtrl.$inject = ['activities'];
  function ActivitiesCtrl(activities) {
    var vm = this;
    vm.activities = activities;
    _.each(vm.activities, function(a) {
      console.log(a)
      setTimeout(function() {
        showMap(a.id, a.summary, true);
      }, 0)
    });
  }

  app.controller('ActivitiesCtrl', ActivitiesCtrl);
})();
