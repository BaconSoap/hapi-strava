(function() {
  var app = angular.module('hapi-strava', ['restangular', 'ui.router']);

  app.config(['RestangularProvider', '$stateProvider', '$urlRouterProvider', function(rest, states, urlRouter) {
    rest.setBaseUrl('/api/v1');

    urlRouter.otherwise('/activities');

    states
      .state('activities', {
        url: '/activities',
        templateUrl: '/views/activities.tpl.html',
        controller: 'ActivitiesCtrl as activitiesCtrl'
      }).state('activities.details', {
        url: '/{id:int}',
        templateUrl: '/views/activity.tpl.html',
        resolve: {
          activity: function(ActivitiesSvc, $stateParams) {
            return ActivitiesSvc.get($stateParams.id).then(function(data) {
              return data;
            });
          }
        },
        controller: 'ActivityCtrl as activityCtrl'
      });
  }]);

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

  ActivitiesCtrl.$inject = ['ActivitiesSvc'];
  function ActivitiesCtrl(activitiesSvc) {
    this.activities = activitiesSvc.list();
  }

  ActivityCtrl.$inject = ['ActivitiesSvc', 'activity'];
  function ActivityCtrl(activitiesSvc, activity) {
    console.log(activity)
    this.activity = activity;
    showMap(this.activity.map.summary_polyline)
  }

  function showMap(polyline) {
    var map = new L.Map("map");

    // use Stamen's 'terrain' base layer
    var layer = new L.StamenTileLayer("terrain");
    map.addLayer(layer);

    var decoded = L.Polyline.fromEncoded(polyline);
    map.addLayer(decoded)
    map.fitBounds(decoded.getBounds());
  }

  app.service('ActivitiesSvc', ActivitiesSvc);
  app.controller('ActivitiesCtrl', ActivitiesCtrl);
  app.controller('ActivityCtrl', ActivityCtrl);
})();
