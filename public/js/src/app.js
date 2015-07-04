(function() {
  var app = angular.module('hapi-strava', [
    'restangular', 'ui.router', 'hapi-strava.activities',
    'hapi-strava.activity', 'hapi-strava.templates', 'hapi-strava.filters',
    'hapi-strava.map'
  ]);

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
