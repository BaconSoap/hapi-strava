var gulp = require('gulp');
var concat = require('gulp-concat');
var ngHtml2Js = require("gulp-ng-html2js");

var paths = {
  scripts: './public/js/src/**/*.js',
  templates: './public/js/src/**/*.tpl.html',
  build: './public/js/build/'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(ngHtml2Js({
      moduleName: 'hapi-strava.templates',
      prefix: '/views/'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.build))
})

gulp.task('default', function() {
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.templates, ['templates'])
});
