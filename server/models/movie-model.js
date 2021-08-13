const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    { id: { type: Number, required: true },
        title: { type: String, required: true },
        genres: { type: String, required: true },
        poster_path: { type: String, required: true },
        overview: { type: String, required: true },
        vote_average: { type: Number, required: true },
        watched: { type: Boolean, default: false, required: true } }
   
)

module.exports = mongoose.model('movies', Movie)