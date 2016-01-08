// Require Plugins
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

/*
    Custom Plumber Function:
    Notifies on error with title
 */
function customPlumber(errTitle) {
    return plumber({
      errorHandler: notify.onError({
        // Customizing error title
        title: errTitle || 'Error running Gulp',
        message: 'Error: <%= error.message %>',
      })
    });
};

module.exports = customPlumber;