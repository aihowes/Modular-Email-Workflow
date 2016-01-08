// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');

// Require Plugins
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync');
var fs = require('fs');
var gulpif = require('gulp-if');
var data = require('gulp-data');
var rename = require('gulp-rename');
var path = require('path');
var inlineStyles = require('gulp-inline-css');
var customPlumber = require('./custom-plumber');

var templatingFileExists = function(file) {
    try {
        fs.accessSync('./src/data/' + path.parse(file.path).name + '.json', fs.R_OK | fs.W_OK);
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
}

/*
    Templating Task:
    Compiles template files brings in data, inlines css, and outputs
 */
gulp.task('build',function () {
    nunjucksRender.nunjucks.configure([config.paths.project.src], { watch: false });
    return gulp.src(config.paths.templating.src)
        .pipe(customPlumber('Build Task Failed'))
        .pipe(gulpif(templatingFileExists, data(function(file) {
                return JSON.parse(fs.readFileSync('./src/data/' + path.parse(file.path).name + '.json'))
            })))
        .pipe(nunjucksRender())
        .pipe(inlineStyles())
        .pipe(rename(function(path){
                fileName = path.basename;
                path.dirname = path.basename;
                path.basename = "index";
            }))
        .pipe(gulp.dest(config.paths.templating.dest))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({
            onLast: true,
            title: 'Build Task Passed',
            message: 'Build complete and exported'
        }));
});