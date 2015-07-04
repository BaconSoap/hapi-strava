(function(module) {
try {
  module = angular.module('hapi-strava.templates');
} catch (e) {
  module = angular.module('hapi-strava.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/activities/activities.tpl.html',
    '<ui-view/>\n' +
    '<div class="row" ng-repeat="activity in activitiesCtrl.activities">\n' +
    '  <div class="large-2 columns small-3"><img src="http://placehold.it/80x80&text=[img]"></div>\n' +
    '\n' +
    '  <div class="large-10 columns">\n' +
    '    <h4><a ui-sref=".details({id: activity.id})">{{activity.name}}</a></h4>\n' +
    '\n' +
    '    <ul class="inline-list">\n' +
    '      <!--<li>\n' +
    '        <a href="">Reply</a>\n' +
    '      </li>\n' +
    '\n' +
    '      <li>\n' +
    '        <a href="">Share</a>\n' +
    '      </li> -->\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '  <hr>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('hapi-strava.templates');
} catch (e) {
  module = angular.module('hapi-strava.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/activities/activity.tpl.html',
    'Viewing bike ride {{activityCtrl.activity.name}}\n' +
    '<div id="map" style="width: 300px; height: 300px"> </div>\n' +
    '');
}]);
})();
