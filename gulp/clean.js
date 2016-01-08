// Require Gulp
var gulp = require('gulp');

// Require Utils
// var gutil = require('gulp-util');
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');

// Require Plugins
var del = require('del');


/*
    Clean Dist Task:
    Cleans Dist Folder
 */
gulp.task('clean:dist', function (callback) {
    del([
      config.paths.project.dest + '**/*'
    ], callback)
});

/*
    Clean Exports Task:
    Cleans Exports Folder
 */
gulp.task('clean:exports', function (callback) {
    del([
      config.paths.exporting.dest + '**/*'
    ], callback)
});