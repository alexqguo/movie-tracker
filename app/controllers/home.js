var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Movie.findAll().then(function (movies) {

    movies.sort(function(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (b.name > a.name) {
        return -1;
      }
      return 0;
    });

    res.render('index', {
      title: 'Movies!',
      movies: movies
    });
  });
});

//Move this to separate file eventually
router.post('/movies/create', function(req, res, next) {
	db.Movie.create(req.body)
		.then(function(movie) {
			res.render('movieItem', { movie: movie });
		})
		.catch(function(error) {
			res.status(500).send({status: "ERROR", error: error});
		});
});

router.put('/movies/:id/update', function(req, res, next) {
  db.Movie.update(req.body, { where: { id: req.params.id } })
    .then(function(movie) {
      res.send({status: "SUCCESS"});
    })
    .catch(function(error) {
      res.status(500).send({status: "ERROR", error: error});
    });
  // res.send("update movie with id: " + req.params.id);
});