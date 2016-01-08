// Require Gulp
var gulp = require('gulp');
var runSequence = require('run-sequence');

// require plugins
var config = require('./config.json');

/*
    Watcher Task:
    Watches source paths and calls retrospective task
 */
gulp.task('watch', function() {
    gulp.watch(config.paths.templating.all, ['build']);
    gulp.watch(config.paths.templating.src, ['build']);
    gulp.watch(config.paths.data.src, ['build']);
    gulp.watch(config.paths.styles.src, function() { runSequence('styles', 'build'); });
    gulp.watch(config.paths.images.src, ['images']);
});