// requirements here
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;

// define route modules here
//var index = require('./routes/index');

var app = express();

mongoose.connect('mongodb+srv://meverg:123456gs@powersharedb-fsk5o.mongodb.net/PowerShareDB');
var db = mongoose.connection;

db.on('connected', function() {
  console.log("connected to database successfully.");
});

// set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set router middlewares
//app.use('/', index);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://%s:%s", host, port)
});