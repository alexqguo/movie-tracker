

var express = require('express'),
	bodyParser = require('body-parser'),
  config = require('./config/config'),
  db = require('./app/models');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/express')(app, config);

db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port);
  }).catch(function (e) {
    throw new Error(e);
  });

