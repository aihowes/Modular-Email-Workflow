// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');
var secrets = require('./secrets.json');

// Require Plugins
var s3 = require('gulp-s3');
var ftp = require('vinyl-ftp');
var rsync = require('rsyncwrapper').rsync;
var customPlumber = require('./custom-plumber');

if (config.deployment == 'ftp') {
	var conn = ftp.create({
		host:     secrets.deployment.ftp.host,
		user:     secrets.deployment.ftp.user,
		password: secrets.deployment.ftp.password,
		log:      gutil.log
	});
}

/*
    Upload Task:
    Uploads all publishable files and folders
    in whichever method chosen in config
 */
gulp.task('upload', function () {
	switch(config.deployment) {
	    case 's3':
			gulp.src(config.paths.project.dest)
				.pipe(customPlumber('Upload S3 Task Failed'))
				.pipe(s3({
					'key': secrets.deployment.s3.key,
					'secret': secrets.deployment.s3.secret,
					'bucket': secrets.deployment.s3.bucket,
					'region': secrets.deployment.s3.region
				}))
		        .pipe(notify({
		        	onLast: true,
		            title: 'Upload S3 Task Passed',
		            message: 'Files has been uploaded to S3'
		        }));
	        break;
	    case 'rsync':
			rsync(
				{
					src: config.paths.project.dest,
					dest: secrets.deployment.rsync.user + '@' + secrets.deployment.rsync.host + ':' + secrets.deployment.rsync.dest,
					ssh: true,
					recursive: true,
					deleteAll: true
				},
				function(error, stdout, stderr, cmd) {
					if (error) {
						console.log(error.message);
						console.log(stdout);
						console.log(stderr);
						notify({
				            title: 'Upload RSync Task Failed',
				            message: 'See the cli for details.'
				        });
					}
				}
			);
	        break;
	   	case 'ftp':
			return gulp.src(config.paths.project.dest)
				.pipe(customPlumber('Upload FTP Task Failed'))
				.pipe(conn.dest(secrets.deployment.ftp.dest))
		        .pipe(notify({
		        	onLast: true,
		            title: 'Upload FTP Task Passed',
		            message: 'Files has been uploaded using FTP'
		        }));
	        break;
	}

});

if (config.deployment == 'ftp') {
	/*
	    FTP Clean Task:
	    Cleans Remote FTP Folder
	 */
	gulp.task('ftp-clean', function (cb) {
		conn.rmdir('secrets.deployment.ftp.dest', function (err) {
			if (err) {
				console.log(err);
			}
		});
	});
}