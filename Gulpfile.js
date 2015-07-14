var gulp = require('gulp');
var concat = require('gulp-concat');
var ngHtml2Js = require("gulp-ng-html2js");
var sass = require('gulp-sass');
var reload = require('gulp-livereload');

var paths = {
  scripts: './public/js/src/**/*.js',
  templates: './public/js/src/**/*.tpl.html',
  build: './public/js/build/',
  styles: './public/styles/**/*.scss'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(ngHtml2Js({
      moduleName: 'hapi-strava.templates',
      prefix: '/views/'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.build))
})

gulp.task('sass', function() {
  return gulp
    .src(paths.styles)
    .pipe(sass({
      includePaths: ['./public/vendor/foundation/scss']
    }).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(reload());
});

gulp.task('default', function() {
  reload.listen();
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.templates, ['templates'])
  gulp.watch(paths.styles, ['sass'])
});
