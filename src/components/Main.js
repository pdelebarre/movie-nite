import React from "react";
import SearchMovie from "./Movie/SearchMovie";

import classes from "./Movies.module.css";
import Movie from "./Movie/Movie";

import { useEasybase } from "easybase-react";

import ebconfig from "../ebconfig.js";

import { useState, useEffect } from "react";

import GENRES from "../resources/genres";

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

const Main = () => {
  const [refresh, setRefresh] = useState(false);

  const table = useEasybase({ ebconfig }).db("MOVIES");

  const { db, e, useReturn } = useEasybase();

  // 1st param is a function, returning a `db().return` instance without having been executed
  // 2nd param is dependencies that cause a re-fetch when changed
  const { frame } = useReturn(() => db().return(), [refresh]);

  console.log("List of movies");
  console.log(frame);

  const headers = (
    <thead>
      <tr>
        <th>watched</th>
        <th>title</th>
        <th>genre</th>
        <th>poster</th>
        <th>delete</th>
      </tr>
    </thead>
  );

  // use easybase's hooks to access the data.
  //   const { Frame, useFrameEffect, configureFrame, sync } = useEasybase();
  //   // const [movies, setMovies] = useState([]);

  //   useEffect(() => {
  //     // configureFrame sets up our Frame to access the appropriate list of data.
  //     // in this case, it's only showing the first 10 rows, for the table LISTOFDATA
  //     configureFrame({ limit: 10, offset: 0, tableName: "MOVIES" });
  //     sync();
  //     // this *should* be [configureFrame, sync] because we want the useEffect hook to fire if
  //     // those values change. However, easybase-react *always* updates them, so we need to pass
  //     // an empty array. And then disable the warning in the linter. I consider this a bug in easybase.
  //     // eslint-disable-next-line
  //   }, []);

  //   useFrameEffect(() => {
  //     console.log("Frame changed!");
  //   });

  //   useEffect(() => {
  //     mounted();
  //   }, [])

  //   const { frame } = useReturn(() => {
  //     console.log("getting data...");
  //     db("MOVIES").return();
  //     console.log(`movies`, frame);
  //   }, []);

  //   const movieExists = (id) => {
  //     return movies.some((movie) => {
  //       return movie.id === id;
  //     });
  //   };

  const addMovie = async (movie) => {
    //     if (movieExists(movie.id)) {
    //       console.log(`duplicate!`, movie);
    //       return;
    //     }

    let genres = getGenres(movie.genre_ids);
    try {
      await table
        .insert({
          title: movie.title,
          genres: genres,
          posterpath: movie.poster_path,
          watched: false,
          overview: movie.overview,
          voteaverage: Number(movie.vote_average),
          id: movie.id,
        })
        .one();
    } catch (_) {
      alert("Error on input format");
    }

    setRefresh((st) => !st);
  };

  const delMovie = async (id) => {
    let singleRecord = await table.return().where(e.eq("id", id)).one();

    await table.delete().where({ _key: singleRecord._key }).one();

    setRefresh((st) => !st);
  };

  const markWatched = async (id) => {
    let singleRecord = await table.return().where(e.eq("id", id)).one();
    let watched = singleRecord.watched;

    await table
      .where({ _key: singleRecord._key })
      .set({ watched: !watched })
      .one();

    setRefresh((st) => !st);
  };

  return (
    <div className={classes.container}>
      <SearchMovie onSelect={addMovie} />
      {/* <Movies movies={Frame()} delMovie={delMovie} markWatched={markWatched} /> */}

      <table className={classes.movies}>
        {headers}
        <tbody>
          {frame.map((movie, index) => {
            return (
              <Movie
                key={movie.id}
                movie={movie}
                delMovie={delMovie}
                markWatched={markWatched}
                // index={movie["_key"]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
