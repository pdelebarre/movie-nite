const express = require('express')
const rateLimit = require('express-rate-limit');
const MovieCtrl = require('../controllers/movie-ctrl')

const router = express.Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

router.post('/movie', limiter, MovieCtrl.createMovie)
router.put('/movie/:id', limiter, MovieCtrl.updateMovie)
router.delete('/movie/:id', limiter, MovieCtrl.deleteMovie)
router.get('/movie/:id', limiter, MovieCtrl.getMovieById)
router.get('/movie/tmdb/:id', limiter, MovieCtrl.getMovieByTMDBId)
router.get('/movies', limiter, MovieCtrl.getMovies)


module.exports = router