// requirements here
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');

var PORT = process.env.PORT || 3000;

// define route modules here
var pbRoutes = require('./routes/pbRoutes');
var userRoutes = require('./routes/userRoutes');

var app = express();

mongoose.connect('mongodb://dummy:foo123bar@ds239368.mlab.com:39368/powershare');
var db = mongoose.connection;

db.on('connected', function() {
  console.log("connected to database successfully.");
});

// set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

// set router middlewares
app.use('/find', pbRoutes);
app.use('/user', userRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send(err);
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://%s:%s", host, port)
});