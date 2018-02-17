var express = require('express'),
    path    = require('path'),
    favicon = require('serve-favicon'),
    logger  = require('morgan'),
    bodyParser =  require('body-parser'),
    mongoose  = require('mongoose');

    mongoose.Promise  = Promise;

var book = require('./routes/book');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);

//  404 Catcher
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handling
app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page render
  res.status(err.status || 500);
  res.render('error')
});

// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean-angular5', {})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

module.exports = app;
