# Modular Email Workflow (MEW)
A modular email developement workflow using Gulp

## Features
MEW has a bunch of features that makes developing and testing your email templates easier and quicker. View the features table below for a quick rundown.

| Feature | Summary |
|---------|---------|
| Sass support | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more. |
| Autoprefixer | Prefix your CSS Automatically based on browser usage |
| Templating | Use [Nunjucks](https://mozilla.github.io/nunjucks/) to build layouts, partials, variable and more to make your template development modular. |
| Image Minification | Reduce bloat: Minify and Losslessly compress your images |
| Inlined CSS | Autumatically inline your CSS on the fly, avoiding any issues with email services stripping it out |
| BrowserSync | Gone are the days of needing to refresh |
| Sends | Sending your email using [Mailgun](https://www.mailgun.com/) |
| Test | Send a test to your [Litmus](https://litmus.com/) Account (If you have one) |
| Upload | Use a range of methods (S3, FTP, RSync) to upload all your work to your own hosting |
| Zip | Zip your template for easy transporting |

## Installation
MEW requires you to have [Node.js](https://nodejs.org/en/) and [Gulp.js](http://gulpjs.com/) installed. Follow the links to get those installed.

Clone this Repo and then use npm to install MEW's dependencies:
```
	$ git clone https://github.com/aihowes/modular-email-workflow.git
	$ npm install
```
If the above fails try using `sudo`.

## Using MEW
### Config - `config.json`
A default `config.json` file has been provided within the project, simply replace values as necesary. You'll find configuration options for paths, what deployment/uploading method you want to use, Autoprefixer Browserlist, recipient and remote images path used when sending an email.

### Secrets - `config.json`
As some tasks may require sensitive information such as passwords. You should store this data in `secrets.json`, this file should not be commit into your repository. An example version of this file is included in the project labeled as `secrets.example.json` - edit this file using your information and rename it to `secrets.json`.

### BrowserSync - `gulp browser-sync`
BrowserSync, in short, creates a local server that allows for changes to be shown on the browser without the need of a refresh. It also has some other features such as scroll syncing, network throttling and more.

Use `gulp browser-sync` to start up the server. The server will point to your project destination folder.

### Images - `gulp images`
Images play a huge part in developing a successful email, however they can be taxing on email weight and load times.

Use `gulp images` minifies all PNGs, JPEGs, GIFs and SVGs and outputs them into your project destination folder.

### Send - `gulp send --template test`
Emails are best viewed in an email client. MEW uses Mailgun to send emails straight into your inbox. Mailgun offers free accounts for sending less than 10,000 emails a month. After you get your account enter your API key, sender and recipient in your `secrets.json` file.

If your email has images I'd recommend uploading your images using the gulp upload task, as this task will replace image paths with the remote images path in your `config.json` file.

Test your emails but running `gulp send --template test` replacing the word 'test' with the email template you wish to send.

### Litmus - `gulp litmus --template test`
Litmus is a email testing platform. If you have an account you can send a test email to your litmus account and view it in your listed applications.

If your email has images I'd recommend uploading your images using the gulp upload task, as this task will replace image paths with the remote images path in your `config.json` file.

Add your account details into `secrets.json` and use `gulp litmus --template test` replacing the word 'test' with the email template you wish to check in litmus.

### Styles  - `gulp styles`
MEW allows you to use Sass. It also uses Autoprefixer to prefix your CSS. You can configure your Autoprefixer Browserlist in `config.json`.

Run `gulp style` to process your CSS.

### Templating/Build - `gulp build`
The build task is the main bulk of MEW due it's use of the CSS Inliner and the ability to use Nunjucks.

Inlining your CSS prevents email services stripping out the head tag including any CSS in the head tag. The build task will read what stylesheet is linked your templates and inline each CSS rule to the specific element.

The build tool allows the use of Nunjucks. Nunjucks is a templating language created by Mozilla, it allows you to use variables, partials, layouts and much more. [Click here for more on Nunjucks](https://mozilla.github.io/nunjucks/). To make the most out of Nunjucks you can implement a data object into your template. To do this, create a `.json` file in the data folder with the same name as your Nunjucks/HTML file, you'll then be able to reference the data in that JSON file.

NOTE you can just use plain HTML if you wish.

### Zip - `gulp zip --template test`
If you need to send all the files used in a template your best off zipping your template.

Run `gulp zip --template test` replacing the word 'test' with the email template folder you wish to zip.

### Watch - `gulp watch`
Use the `gulp watch` task to set gulp to watch for any changes in your files. Depending on what files are changed, gulp will re-run the task for you.

### Upload - `gulp upload`
The upload task makes upload your files and images quick and easy, remember replace image paths with the remote images path in your `config.json`. This task shouldn't be used to replace your version control but just as a quick upload to allow you to send a test email with images.

There are three methods that MEW provides for uploading these are: RSync, FTP and Amazon S3. Choose your method in the `config.json` file and update your details in the `secrets.json` file.

Run `gulp upload` to upload your project destination folder to your remote location. If you're using FTP to upload, there is a `gulp ftp-clean` to clear your remote location. If you're using RSync please be aware that DeleteAll is turned on meaning that it will delete any folders or files in your remote synced folder on your remote that aren't on your local copy.

### Clean - `gulp clean:dist` OR `gulp clean:exports`
If you want to clean up the project destination folder or the project exports folder. Use either `gulp clean:dist` or `gulp clean:exports`.

## The Base Files
As MEW allows you to use data, Nunjucks and Sass you can really start making your emails a lot more modular.

The default files found in the `src` directory is what I use to create modular and reusable emails.

`index.nunjucks` - is our template and is already included in the MEW repository. The index.nunjucks file uses base.nunjucks in the layouts folder as a base HTML Email (more on the layout later), the template file (`index.nunjucks`) also contains a special loop that goes through all the sections in the `index.json` file located in the data folder (more on the data later).

`base.nunjucks` found in the layouts folder is a base HTML email it has the standard stuff like the doctype, head, body and meta tags. It also takes in data form the current templates data file - in this case, `index.json`. The data it currently uses is `settings.title` and `settings.stylesheet`.

`index.json` is the data file used for the `index.nunjucks` template. You'll see it's a just a JSON object pre-filled with data already used by our layout and template files. The settings object will be used by base.nunjucks to set a stylesheet for that template and a subject-line/title for the template. You'll also see that there is another object - sections. The sections object is what is used by our template file `index.nunjucks`. `index.nunjucks` will loop through each object in sections, using the `section.name` to include a partial with that name located in the partials folder. For example, the section currently in `index.json` is main-text, when index.nunjucks loops through it will include `partials/main-text.nunjucks`.

Partials allow you to break up your email into modular parts, a few examples are: The header, main text, unsubscribe footer and social grid. Each partial could also be a Nunjucks file and use data provided by the templates data file. If you look into `main-text.nunjucks` you'll see there is a description variable being used - this description variable will be pulled in from `index.json`, the main-text sections description attribute. You'll also see that I can provide a fallback for description if one isn't provided by a data file.

## An Advanced Workflow
*Picture this*: You have a client who requires you to develop a monthly newsletter which follows almost the same layout each month (sometimes they like to switch it up), the only difference being the links, images and content in the newsletter. PS: they also don't have a decent email marketing platform that allows for templates to be editable.

You've already gone through the config and secrets file, edited it correctly.

I'd break out the template into separate partials, head into index.json, start adding each required partial as a section in the object - matching up the section name to the partial file name - and create attributes for each part of your section that changes monthly. Then head into each partial, and start using the attributes created in the data file. Make sure you set a title for your email and set what stylesheet you would like to use.

You setup a small Sass file for your stylesheet, nothing special (this isn't a Sass tutorial), it has colours set as variables and maybe an import of [Zurb's Ink](http://foundation.zurb.com/emails)

It all goes smoothly you, run `gulp`, it compiles, it builds, it watches, it inlines your CSS, you head to your template and make a couple of tweaks without needing to refresh. You're happy, you upload, you send a test email, you zip your template, send it to the client and they're happy.

The next month comes along, all you'll need to do is duplicate the index.json, index.nunjucks (assuming you want to keep the previous version) rename them. Head into your new data file, edit the section to have the latest content, run `gulp` again and you have that month's email. Let's say the client wants a new section added? No problem! Create a partial, add the section to your data file, run gulp again and you now have a that new section wherever you added it into the data file (NOTE: Sections are outputted in the order shown in the data file.)

MEW allows you to create more than one template per each repository. I'd recommend having a MEW repository for each client, that way you can re-use all your clients partials amongst their templates. You're also not limited to just one CSS file, so feel free to create a stylesheet for each template or template type. If you're using Sass, use Sass partials and import colours and grid systems.

## Thanks
This project wouldn't be possible with the maintainers and creators of Gulp and the Gulp plugins used (there are a bunch of them). Thanks for the numerous amount of blog posts that helped too, specifically the [Automate Your Workflow](http://automateyourworkflow.com/) Book by Zell Liew.

Also thanks to the other Email Automation Workflows available, feel free to check them out if this doesn't tickle your fancy. [Gulp Email Creator](https://github.com/darylldoyle/Gulp-Email-Creator) & [Grunt Email Workflow](https://github.com/leemunroe/grunt-email-workflow)

## License
Modular Email Workflow is released under the [MIT License](https://opensource.org/licenses/MIT).

## Author
[Alex Howes](http://alexhowes.co.uk) - [@aihowes](http://twitter.com/aihowes)