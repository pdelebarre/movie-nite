import React, { useState, useEffect } from "react";
import api from "./api/queries";

import SearchMovie from "./components/Movie/SearchMovie";
import MovieList from "./components/Movie/MovieList";

import GENRES from "./resources/genres";

const getGenres = (genre_ids) => {
  let genres_array = [];
  genre_ids.map((id) => {
    const result = GENRES.find((genre) => genre.id === id);
    genres_array.push(result.name);
    return genres_array;
  });

  console.log(genres_array.toString());
  return genres_array.toString();
};

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    retrieveMovies();
  }, []);

  const retrieveMovies = async () => {
    await api
      .getAllMovies()
      .then((response) => {
        setMovies(response.data.data);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };

  const addMovie = async (movie) => {
    console.log(`adding `, movie);

    const genres = getGenres(movie.genre_ids);

    const payload = {
      id: movie.id,
      title: movie.title,
      genres: genres,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: Number(movie.vote_average),
      watched: false,
    };

    await api.insertMovie(payload).then((res) => {
      payload._id = res.data.id;
      console.log(`res`, payload._id);
    });
    setMovies([...movies, payload]);
  };

  const onAddHandler = async (movie) => {
    console.log(`in App, adding `, movie.title);
    const lookup = await api.getMovieByTMDBId(movie.id).catch((error) => {
      console.log(`not a duplicate, OK to add `, movie.title);
    });

    lookup == null ? addMovie(movie) : console.log(`dupe `, movie);
  };

  const onWatchedHandler = (movie) => {
    const payload = { ...movie };
    payload.watched = !payload.watched;

     async function updateMovie(movie) {
      await api.updateMovieById(movie._id, payload);
    }

    updateMovie(movie)

    const newMovies = movies.filter((item) => item._id !== movie._id);
    setMovies([...newMovies, payload]);

  };

  const onRemoveHandler =  (movie) => {
    async function deleteMovie(movie) {
     await api.deleteMovieById(movie._id);
    }

    deleteMovie(movie);
    const newMovies = movies.filter((item) => item._id !== movie._id);
        setMovies(newMovies);
  };

  return (
    <div>
      <MovieList
        movies={movies}
        onWatchedHandler={onWatchedHandler}
        onRemoveHandler={onRemoveHandler}
      />
      <SearchMovie onAddHandler={onAddHandler} />
    </div>
  );
}

export default App;
