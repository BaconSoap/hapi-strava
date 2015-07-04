(function() {
  var app = angular.module('hapi-strava', ['restangular', 'ui.router', 'hapi-strava.activities', 'hapi-strava.activity']);

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
})();
