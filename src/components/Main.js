import React, { useState } from "react";

import SearchMovie from "./Movie/SearchMovie";
import classes from "./Movies.module.css";
import Movie from "./Movie/Movie";

import { useEasybase } from "easybase-react";
import ebconfig from "../ebconfig.js";

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

  const { db, e, useReturn } = useEasybase();
  const table = useEasybase({ ebconfig }).db("MOVIES");

  const { frame } = useReturn(
    () => table().orderBy({ by: "watched", sort: "asc" }).return(),
    [refresh]
  );

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

  const movieExists = async (id) => {
    let singleRecord = await table.return().where(e.eq("id", id)).one();
    return singleRecord === null;
  };

  const addMovie = async (movie) => {
    if (movieExists(movie.id)) {
      console.log(`duplicate!`, movie);
      return;
    }

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
      {/* TODO:fix first call and call when non empty */}
      <SearchMovie onSelect={addMovie} />

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
