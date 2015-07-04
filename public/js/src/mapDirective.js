(function() {
  var app = angular.module('hapi-strava.map', []);
  app.directive('leafletMap', function($templateCache) {
    return {
      template: $templateCache.get('/views/leafletMap.tpl.html'),
      scope: {
        polyline: '=polyline',
        mapId: '=mapId',
        isStatic: '=isStatic',
        size: '=size'
      },
      link:  {
        pre: function(scope, el, attrs) {
          scope.elId = 'hapi-map-' + scope.mapId;
          scope.size = scope.size || 300;
        }, post: function(scope, el, attrs) {
          setTimeout(function() { showMap(el.find('div')[0], scope.polyline, scope.isStatic)}, 0);
        }
      }
    };
  });

  function showMap(id, polyline, isStatic) {
    var map = new L.Map(id, {
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

})();
