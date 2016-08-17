# tech-intro
This tutorial includes the following features

- Setup node web server with Express (https://expressjs.com/)
- Routing
- Templating with Handlebars (http://handlebarsjs.com/)
- Styling with Materialize (http://materializecss.com/)
- Versioning with Git
- Deploy to Heroku

## Prerequisites
- Git (https://github.com/)
- NodeJS (https://nodejs.org/)
- Heroku account (if you want to publish your app) (https://www.heroku.com/)

#### Install Node
Node.js is a modern framework which include both a web server (listen to traffic on a port)
and responding to server requests.

Install from [this link](https://nodejs.org/download/).

Open the download file and follow the installation guide.

#### Install Github client
Github has a graphical interface client for Git. Download [from their website](https://desktop.github.com/).
Install and start the app. Create a [Github account](https://github.com/join) if you do not have one already.

Throughout the entire tutorial I recommend you to make a commit of the changes you made
after a couple of sections. This will give you a good overview of all changes,
one of many advantages of using version control.

#### Create a Heroku account
Heroku is a cloud platform that lets you build, deploy and monitor apps. One of Heroku's strengths is that it's easy to publish your local project on a public domain.

If you want to deploy the demo application we will be creating, create a [Heroku account](https://www.heroku.com/) and install Heroku Toolbelt.


## Start coding the backend

#### Create your Node application
Go to the folder where you want to store your code. Then run these commands.

    npm init

Follow instructions, just push enter. This will create a file called package.json
containing information about your NodeJS application, such as it's dependencies.

Then run this from command line.

    npm install express --save

This will install the module "Express" which is the web server we will use. 

Create a new file named `index.js` with the following content:

    var express = require('express');
    var app = express();
    var server = app.listen(3000, function () {
      console.log('Example app listening at http://localhost:3000');
    });
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

To run the server you run this command:

    node index.js

Now open [http://localhost:3000/](http://localhost:3000/) in your browser and marvel at
your first NodeJS page!

Note: In the continued tutorial you need to restart the node server after each change to `index.js`.


#### List of images
Next create a new endpoint in the same file (`index.js`) by adding this content:

    var list_of_animal_images = [
		{src: 'http://www.extremetech.com/wp-content/uploads/2013/09/4Vln8-640x428.jpg', title: 'Pic 1', desc: 'Pretty picture, huh?'},
		{src: 'http://threeriversvetgroup.co.uk/wp-content/uploads/2012/05/farm-animals.jpg', title: 'Pic 2', desc: 'Pretty picture, huh?'},
		{src: 'https://i.imgflip.com/h92ym.jpg', title: 'Pic 3', desc: 'Pretty picture, huh?'},
		{src: 'http://justsomething.co/wp-content/uploads/2013/11/cutest-baby-animals-21.jpg', title: 'Pic 4', desc: 'Pretty picture, huh?'},
		{src: 'http://www.bestfunnyjokes4u.com/wp-content/uploads/2012/12/talking-animals-joke.jpg', title: 'Pic 5', desc: 'Pretty picture, huh?'},
		{src: 'http://s3-us-west-1.amazonaws.com/www-prod-storage.cloud.caltech.edu/styles/article_photo/s3/CT_Brain-Animal-Recog_SPOTLIGHT.jpg?itok=i4fXi7PO', title: 'Pic 6', desc: 'Pretty picture, huh?'},
		{src: 'http://udel.edu/~emmaauf/website%20project/final%20webpage/farmanimals/images/duckling.jpg', title: 'Pic 7', desc: 'Pretty picture, huh?'}
	];
    app.get('/animal_list_data', function (req, res) {
      res.header('Content-Type', 'application/json');
      res.send({
        'animals': list_of_animal_images
      });
    });

Now you can see a JSON list of animal images with title and description on [http://localhost:3000/animal_list_data](http://localhost:3000/animal_list_data).


#### Show list of images
Add this code to `index.js`.

    app.get('/', function (req, res) {
      var returnString = '<ul>';
      list_of_animal_images.forEach(function (image) {
        returnString += '<li><img src="' + image.src + '" width="400"></li>';
      });
      returnString += '</ul>';
      res.send(returnString);
    });

Now you can see a list of the images on [http://localhost:3000/](http://localhost:3000/).


#### Clean up code using template engine
This code will soon become messy, interchanging app logic and the presentation of data.

To separate those two concepts we will install a template engine. We will use Handlebars (hbs). Run this command from command line.

    npm install hbs --save

Now add these lines of code in the beginning of `index.js` (after the variable `app` has been created).

    var path = require('path');
    var hbs = require('hbs');
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '/views'));

Create a folder named `views` and in that create a file named `index.hbs` with this content.

    <h1>{{ headline }}</h1>
    <ul>
        {{#each images}}
            <li><img src="{{ this.src }}" width="400"></li>
        {{/each}}
    </ul>

Also add a file named `layout.hbs` in the `views` folder with this content.

    <!DOCTYPE html>
    <head>
      <meta charset='utf-8'>
      <title>Tech intro tutorial</title>
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    </head>
    <body>
      {{{ body }}}
    </body>
    </html>

Update the '/' endpoint of `index.js` to this

    app.get('/', function (req, res) {
      res.render('index', {
        headline: 'Animal Gallery',
        images: list_of_animal_images
      });
    });

Visit [http://localhost:3000/](http://localhost:3000/) and you
will see the same list of images, but this code will be much simpler to maintain.

#### Prepare for frontend application
We need to make some more changes before we can start building the frontend of our application.
Add this to `index.js` to be able to serve static files.

    app.use(express.static(path.join(__dirname, 'public')));

Also create the folders and files we will need for our frontend application. This should
be the resulting tree structure of your working folder.

    nodejs_app/
    ├── index.js
    ├── public
    │   └── assets
    │       ├── css
    │       │   └── main.css
    │       └── js
    │           └── app.js
    └── views
        ├── index.hbs
        └── layout.hbs

The last preparation is to add the loading of `main.css` and `app.js` in `layout.hbs`.
In the `<head>` part add:

    <link rel='stylesheet' type='text/css' href='/assets/css/main.css'>

And after `{{{ body }}}` but before `</body>` add this:

    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src='/assets/js/app.js'></script>

This will first load the jQuery framework, and then add our own code, which depends on jQuery.

#### Styling with Materialize
A popular way of creating stylish web apps is to use a frontend framework for styling, icons and animations.
We will explore some of the features of [Materialize](http://materializecss.com/) which is based on Google's Material Design.

To use it, add the Materialize javascript after jQuery but before `app.js` right before `</body>`

	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script> <!-- ADD THIS LINE -->
	<script type="text/javascript" src='/assets/js/app.js'></script>

Also add Materialize CSS and font in the `<head>` before `main.css`

	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <!-- ADD THIS LINE -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css"> <!-- AND THIS LINE -->
	<link rel='stylesheet' type='text/css' href='/assets/css/main.css'>