import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json"
      }
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)
export const getMovieByTMDBId = id => api.get(`/movie/tmdb/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getMovieByTMDBId,
}

export default apis