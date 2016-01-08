// Require Gulp
var gulp = require('gulp');

// Require Tasks in Directory
require('require-dir')('./gulp', { recurse: true });
var runSequence = require('run-sequence');

gulp.task('default', function(){
	runSequence(
			['styles', 'images'],
			'build',
			'watch',
			'browser-sync'
		);
});