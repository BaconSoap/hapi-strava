var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
  scripts: './public/js/src/**/*.js',
  build: './public/js/build/'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('default', function() {
  gulp.watch(paths.scripts, ['scripts'])
});
