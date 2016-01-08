// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');

// Require Plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var customPlumber = require('./custom-plumber');

/*
    Styles Task:
    Compiles Sass, compresses it and then prefixes it
 */
gulp.task('styles', function () {
    return gulp.src(config.paths.styles.src)
        .pipe(customPlumber('Styles Task Failed'))
        .pipe(sass.sync())
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.paths.styles.dest))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            onLast: true,
            title: 'Style Task Passed',
            message: 'Styles compiled, minified and prefixed'
        }));

});