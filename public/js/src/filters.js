(function() {
  var app = angular.module('hapi-strava.filters', []);

  app.filter('prettyDate', function() {
    return function(val) {
      return (new moment(val)).format('MMM Do, YYYY h:mmA');
    };
  });

  app.filter('prettyTime', function() {
    return function(val) {
      var duration = moment.duration(val, 'seconds');
      var minutes = duration.minutes();
      var seconds = duration.seconds();

      var formatted = '';

      if (minutes > 0) {
        formatted = minutes + ':';
      }

      formatted += (seconds > 9? seconds: '0' + seconds);

      if (minutes == 0) {
        formatted += 's'
      } else {
        formatted += 'm'
      }
      return formatted;
    };
  });

  app.filter('prettyDistance', function() {
    return function(val) {
      return (Math.round(val / 100) / 10) + ' km';
    };
  });
})();
