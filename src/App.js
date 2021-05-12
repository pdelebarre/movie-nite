import { useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import SearchMovie from "./components/Movie/SearchMovie";
import DUMMY_MOVIES from "./resources/dummy_movies";

const App = () => {
  const [movies, setMovies] = useState([]);
  const addMovie = (movie) => {
    console.log(`movie from App`, movie.poster_path)
    let newMovie = {
      id: movie.id, // uuidv4(),
      title:movie.title,
      genre:movie.genre, // TODO lookup genre
      poster_path:movie.poster_path,
      watched:false
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
      <SearchMovie onSelect={addMovie}/>
      {/* <MovieForm addMovie={addMovie} /> */}
      <Movies movies={movies} delMovie={delMovie} markWatched={markWatched} />
    </div>
  );
};

export default App;
