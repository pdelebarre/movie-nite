import React, { useState, useEffect } from "react";
import { useMongoDB } from "./store/mongodb";
import { useRealmApp } from "./store/realm";

import classes from "./App.module.css";

import LogInForm from "./components/LoginForm";
import SearchMovie from "./components/Movie/SearchMovie";
import MovieList from "./components/Movie/MovieList";

// import TestMongo from "./tests/TestMongo";

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
  
  const API_KEY = "X6vbOvQjCACWfxM0IMCGmS8u1j5mPLqL5YnoQFu99dPqn5UnSzGXOeFJ0mp7ZzbB"
   
  const { loginApiKey, logOut, user } = useRealmApp();
  const { db } = useMongoDB();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [movies, setMovies] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const addMovie = async (movie) => {
    console.log(`adding `, movie);

    const genres = getGenres(movie.genre_ids);
    await db
      .collection("movies")
      .insertOne({
        id: movie.id,
        title: movie.title,
        genres: genres,
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: Number(movie.vote_average),
        watched: false,
      })
      .then((result) =>
        console.log(`Successfully inserted item with _id: ${result.insertedId}`)
      )
      .catch((err) => console.error(`Failed to insert item: ${err}`));
  };

  useEffect(() => {
    async function wrapMovieQuery() {
      if (user && db) {
        const authoredMovies = await db.collection("movies").find();
        setMovies(authoredMovies);
      }
    }
    wrapMovieQuery();
  }, [user, db, refresh]);

  async function handleLogIn() {
    //await logIn(email, password);
    await loginApiKey(API_KEY);
  }

  const isDuplicate = async(movie) => {
    const dupe = await db
    .collection("movies").findOne({ id: movie.id });
    console.log('dupe?',dupe);

    return !(dupe===null);
  }


  const onAddHandler = async (movie) => {
    console.log(`in App, adding: `, movie);
    let dupe=await isDuplicate(movie);
    dupe?console.log(`dupe`, movie): addMovie(movie);
    setRefresh(st=>!st);
  };

  handleLogIn();

  return user && db && user.state === "active" ? (
    <div className={classes.contain}>
      <MovieList
        
        movies={movies}
        user={user}
        logOut={logOut}
      />
      <SearchMovie className={classes.row} onAddHandler={onAddHandler} />

      {/* <TestMongo /> */}
    </div>
  ) : (
    // <LogInForm className={classes.contain}
    //   email={email}
    //   setEmail={setEmail}
    //   password={password}
    //   setPassword={setPassword}
    //   handleLogIn={handleLogIn}
    // />
    <>
    {/* {handleLogIn} */}
    </>
  );
}

export default App;
