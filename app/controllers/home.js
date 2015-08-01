var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Movie.findAll().then(function (movies) {
    res.render('index', {
      title: 'Movies!',
      movies: movies
    });
  });
});

//Move this to separate file eventually
router.post('/movies/create', function(req, res, next) {
	res.send("hello");
});