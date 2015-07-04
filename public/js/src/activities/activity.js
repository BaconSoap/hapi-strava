
(function() {
  var app = angular.module('hapi-strava.activity', ['hapi-strava.model.activities']);

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

  app.controller('ActivityCtrl', ActivityCtrl);
})();
