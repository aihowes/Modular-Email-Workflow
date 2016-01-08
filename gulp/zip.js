// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');

// Require Plugins
var config = require('./config.json');
var args = require('yargs').argv;
var zip = require('gulp-zip');
var customPlumber = require('./custom-plumber');

gulp.task('zip', function () {
	if (!args.template) {
		notify({
            title: 'ZIP Task Failed',
            message: 'Please supply template argument'
        });
	} else {
		gulp.src(config.paths.project.dest + '/' + args.template + '/**/*')
			.pipe(customPlumber('Image Task Failed'))
			.pipe(zip(args.template + '.zip'))
			.pipe(gulp.dest(config.paths.exporting.dest))
	        .pipe(notify({
	            title: 'ZIP Task Passed',
	            message: 'Folder: ' + args.tempalte + ' has been zipped'
	        }));
	}
});