(function() {
  var app = angular.module('hapi-strava.model.activities', ['restangular']);

  ActivitiesSvc.$inject = ['Restangular'];

  function ActivitiesSvc(rest) {
    this.allActivities = rest.all('activities');
    this.activityCache = [];
    this.streamsCache = [];
  };

  ActivitiesSvc.prototype.list = function() {
    if (!this.listCache) {
      this.listCache = this.allActivities.getList();
    }
    return this.listCache;
  }

  ActivitiesSvc.prototype.get = function(id) {
    if (!this.activityCache[id]) {
      this.activityCache[id] = this.allActivities.get(id);
      this.activityCache[id].then(this.getStreams.bind(this))
    }
    return this.activityCache[id];
  }

  ActivitiesSvc.prototype.getStreams = function(activity) {
    var id = activity.id;
    if (!this.streamsCache[id]) {
      this.streamsCache[id] = activity
        .customGET('streams')
        .then(function(d) { return d.plain(); });
    }
    return this.streamsCache[id];
  }

  app.service('ActivitiesSvc', ActivitiesSvc);
})();
