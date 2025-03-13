const express = require('express');
const movieController = require('./../Controllers/MoviesController');

const router = express.Router();

//router.param('id',movieController.checkId);

router.route('/highest-rate').get(movieController.getHighestRate ,movieController.getMovies)
router.route('/')
.get(movieController.getMovies)
.post(movieController.createMovie)
.delete(movieController.deleteMovies);

router.route('/:id')
.get(movieController.getMoviesId)
.patch(movieController.updateMovie)
.delete(movieController.deleteMovie)



module.exports = router;