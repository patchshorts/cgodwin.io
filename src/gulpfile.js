var gulp = require('gulp');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var reload      = browserSync.reload;
// Configuration file to keep your code DRY
var cfg = require( './gulpconfig.json' );
var paths = cfg.paths;

gulp.task('clean-dev', function() {
  return gulp.src('./.vuepress/serve', {
      read: false,
      allowEmpty: true
    })
    .on('error', function(err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(clean());
});

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: "./.vuepress/serve"
        }
    });
gulp.watch("./.vuepress/serve/**/*.*").on('change', browserSync.reload);
});
