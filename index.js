var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var fs = require('fs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register Partials
var partialsDir = __dirname + '/views/partials';
var filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var list_of_animal_images = [
  {src: 'http://www.extremetech.com/wp-content/uploads/2013/09/4Vln8-640x428.jpg', title: 'Pic 1', desc: 'Pretty picture, huh?'},
  {src: 'http://threeriversvetgroup.co.uk/wp-content/uploads/2012/05/farm-animals.jpg', title: 'Pic 2', desc: 'Pretty picture, huh?'},
  {src: 'https://i.imgflip.com/h92ym.jpg', title: 'Pic 3', desc: 'Pretty picture, huh?'},
  {src: 'http://justsomething.co/wp-content/uploads/2013/11/cutest-baby-animals-21.jpg', title: 'Pic 4', desc: 'Pretty picture, huh?'},
  {src: 'http://www.bestfunnyjokes4u.com/wp-content/uploads/2012/12/talking-animals-joke.jpg', title: 'Pic 5', desc: 'Pretty picture, huh?'},
  {src: 'http://s3-us-west-1.amazonaws.com/www-prod-storage.cloud.caltech.edu/styles/article_photo/s3/CT_Brain-Animal-Recog_SPOTLIGHT.jpg?itok=i4fXi7PO', title: 'Pic 6', desc: 'Pretty picture, huh?'},
  {src: 'http://udel.edu/~emmaauf/website%20project/final%20webpage/farmanimals/images/duckling.jpg', title: 'Pic 7', desc: 'Pretty picture, huh?'}
];

app.get('/', function (req, res) {
	res.render('index', {
		headline: 'My headline',
		images: list_of_animal_images
	});
});

app.get('/async', function (req, res) {
	res.render('async', {
		headline: 'Async Data'
	});
});

app.get('/animal_list_data', function (req, res) {
	res.header('Content-Type', 'application/json');
	res.send({
		animals: list_of_animal_images
	});
});
