// requirements here
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

// set router middlewares
app.use('/find', pbRoutes);
app.use('/user', userRoutes);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://%s:%s", host, port)
});