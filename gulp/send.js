// Require Gulp
var gulp = require('gulp');

// Require Utils
var notify = require('gulp-notify');

// Require Data
var config = require('./config.json');
var secrets = require('./secrets.json');

// Require Plugins
var mailgun = require('gulp-mailgun');
var replace = require('gulp-replace');
var args = require('yargs').argv;
var dom = require('gulp-dom');
var customPlumber = require('./custom-plumber');

var send_subject;

function setSendSubject(title) {
	send_subject = title;
}

/*
    Send Function:
    Actually Sends the Email
 */
function send() {
	return gulp.src(config.paths.project.dest + args.template + '/index.html')
		.pipe(customPlumber('Send Task Failed'))
		.pipe(replace(/src="images\//g, 'src="' + config.remote_images_path + '/'))
		.pipe(replace(/src='images\//g, "src='" + config.remote_images_path + '/'))
		.pipe(mailgun({
			key: secrets.email.mailgun.key,
			sender: secrets.email.sender,
			recipient: secrets.email.recipients,
			subject: send_subject
		}))
        .pipe(notify({
        	onLast: true,
            title: 'Email Send Function Passed',
            message: 'Email: '+ send_subject + ' - Sent'
        }));
}

/*
    Send Task:
    Gets the Template Name and passes it into send function
 */
gulp.task('send', function () {
	if (!args.template) {
		notify({
            title: 'Send Task Failed',
            message: 'Please supply template argument'
        })
		console.log('Please supply template argument')
	} else {
		gulp.src(config.paths.project.dest + args.template + '/index.html')
			.pipe(dom(function(){
				if (this.title) {
					setSendSubject(this.title);
				} else {
					setSendSubject("Test: "+args.template+".html");
				}
				send();
				return this;
			}));
    }
});

/*
    Litmus Task:
    Sends Email to your Litmus Account
 */
gulp.task('litmus', function () {
	if (!args.template) {
		notify({
            title: 'Litmus Task Failed',
            message: 'Please supply template argument'
        })
		console.log('Please supply template argument')
	} else {
		return gulp.src(config.paths.project.dest + args.template + '.html')
			.pipe(customPlumber('Litmus Task Failed'))
			.pipe(replace(/src="images\//g, 'src="' + config.remote_images_path + '/'))
			.pipe(replace(/src='images\//g, "src='" + config.remote_images_path + '/'))
			.pipe(litmus({
				"username" : secrets.email.litmus.username,
				"password" : secrets.email.litmus.password,
				"url" : secrets.email.litmus.url,
				"applications" : secrets.email.litmus.applications,
			}))
	        .pipe(notify({
	        	onLast: true,
	            title: 'Litmus Task Passed',
	            message: 'Email has been passed to Litmus'
	        }));
	}
});