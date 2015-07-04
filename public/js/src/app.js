(function() {
  var app = angular.module('hapi-strava', ['restangular', 'ui.router', 'hapi-strava.activities', 'hapi-strava.activity', 'hapi-strava.templates']);

  app.config(['RestangularProvider', '$stateProvider', '$urlRouterProvider', function(rest, states, urlRouter) {
    rest.setBaseUrl('/api/v1');

    urlRouter.otherwise('/activities');

    states
      .state('activities', {
        url: '/activities',
        abstract: true,
        template: '<ui-view />'
      }).state('activities.list', {
        url: '',
        templateUrl: '/views/activities/activities.tpl.html',
        controller: 'ActivitiesCtrl as activitiesCtrl',
        resolve: {
          activities: function(ActivitiesSvc) {
            return ActivitiesSvc.list();
          }
        }
      }).state('activities.details', {
        url: '/{id:int}',
        templateUrl: '/views/activities/activity.tpl.html',
        resolve: {
          activity: function(ActivitiesSvc, $stateParams) {
            return ActivitiesSvc.get($stateParams.id);
          }
        },
        controller: 'ActivityCtrl as activityCtrl'
      });
  }]);
})();

function showMap(id, polyline, isStatic) {
  console.log(id + ' showMap')
  var map = new L.Map("map_" + id, {
    attributionControl: false,
    zoomControl: !isStatic
  });

  // use Stamen's 'terrain' base layer
  var layer = new L.StamenTileLayer("terrain");
  map.addLayer(layer);

  var decoded = L.Polyline.fromEncoded(polyline);
  map.addLayer(decoded)
  map.fitBounds(decoded.getBounds());

  if (isStatic) {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    if (map.tap) map.tap.disable();
  }
}
