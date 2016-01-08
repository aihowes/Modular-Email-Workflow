// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');

// Require Plugins
var browserSync = require('browser-sync');

/*
    Server Task:
    Sets up Server
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.paths.project.dest
        }
    });
});