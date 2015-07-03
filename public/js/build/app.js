(function() {
  var app = angular.module('hapi-strava', ['restangular']);

  app.config(['RestangularProvider', function(rest) {
    rest.setBaseUrl('/api/v1');
  }]);

  ActivitiesSvc.$inject = ['Restangular'];

  function ActivitiesSvc(rest) {
    this.allActivities = rest.all('activities');
  };

  ActivitiesSvc.prototype.list = function() {
    return this.allActivities.getList().$object;
  }

  ActivitiesCtrl.$inject = ['ActivitiesSvc'];
  function ActivitiesCtrl(activitiesSvc) {
    this.activities = activitiesSvc.list();
  }

  app.service('ActivitiesSvc', ActivitiesSvc);
  app.controller('ActivitiesCtrl', ActivitiesCtrl);
})();
