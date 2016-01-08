// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');

// Require Plugins
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');
var customPlumber = require('./custom-plumber');

/*
    Images Task:
    Compresses images and then outputs
 */
gulp.task('images', function () {
    return gulp.src(config.paths.images.src)
        .pipe(customPlumber('Image Task Failed'))
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(rename(function(path){
            path.dirname = path.dirname + '/images';
        }))
        .pipe(gulp.dest(config.paths.project.dest))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            onLast: true,
            title: 'Image Task Passed',
            message: 'Images compressed and output'
        }));
});