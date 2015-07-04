(function() {
  var app = angular.module('hapi-strava.model.activities', ['restangular']);

  ActivitiesSvc.$inject = ['Restangular'];

  function ActivitiesSvc(rest) {
    this.allActivities = rest.all('activities');
  };

  ActivitiesSvc.prototype.list = function() {
    return this.allActivities.getList().$object;
  }

  ActivitiesSvc.prototype.get = function(id) {
    return this.allActivities.get(id);
  }

  app.service('ActivitiesSvc', ActivitiesSvc);
})();
