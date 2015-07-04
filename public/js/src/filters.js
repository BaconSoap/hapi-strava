(function() {
  var app = angular.module('hapi-strava.filters', []);

  app.filter('prettyDate', function() {
    return function(val) {
      return (new moment(val)).format('MMM Do, YYYY h:mmA');
    };
  });

  app.filter('prettyDistance', function() {
    return function(val) {
      return (Math.round(val / 100) / 10) + ' km';
    };
  });
})();
