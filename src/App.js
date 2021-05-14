import React, { useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import SearchMovie from "./components/Movie/SearchMovie";
import GENRES from "./resources/genres";

const App = () => {
  const [movies, setMovies] = useState([]);

  const movieExists = (id) => {
    return movies.some((movie) => {
      return movie.id === id;
    });
  };

  const getGenres = (genre_ids) => {
    let genres_array = [];
    genre_ids.map((id) => {
      const result = GENRES.find((genre) => genre.id === id);
      // console.log("genre",result);
      genres_array.push(result.name);
      return genres_array;
    });

    console.log(genres_array.toString());
    return genres_array.toString();
  };

  const addMovie = (movie) => {

    if (movieExists(movie.id)) {
      console.log(`duplicate!`, movie);
      return;
    }

    let genres = getGenres(movie.genre_ids);

    let newMovie = {
      ...movie,
      genres: genres,
      watched: false,
    };

    setMovies([...movies, newMovie]);
  };

  const delMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const markWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    <div>
      <SearchMovie onSelect={addMovie} />
      <Movies movies={movies} delMovie={delMovie} markWatched={markWatched} />
    </div>
  );
};

export default App;
