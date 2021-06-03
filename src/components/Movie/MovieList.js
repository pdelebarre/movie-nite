import React from "react";

import classes from "./MovieList.module.css";

import { GoEye, GoEyeClosed } from "react-icons/go";

const MovieList = (props) => {
  const onRemoveHandler = (movie) => {
    props.onRemoveHandler(movie);
  };

  const onWatchedHandler = (movie) => {
    props.onWatchedHandler(movie);
  };

  const onDetailsHandler = (movie) => {
    console.log("movie :>> ", movie);
  };

  const listMovies = props.movies.map((movie) => (
    <div className={classes.tile} key={movie.id}>
      <div className={classes.tile__media}>
        <img
          className={classes.tile__img}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="movie"
        ></img>
      </div>
      {/* TODO: add link to preview (Modal?) */}
      <div className={classes.tile__details}>
        <div className={classes.tile__title}>
          {movie.id} - {movie.title}
        </div>
        <div className={classes.tile__more}>

        <div
          className={classes.tile__button}
          onClick={() => onDetailsHandler(movie)}
        >
          ...
        </div>
        </div>
        <div className={classes.tile__watched}>
          <div
            className={classes.tile__button}
            onClick={() => onWatchedHandler(movie)}
          >
            {movie.watched ? <GoEye /> : <GoEyeClosed />}
          </div>
        </div>
        <div className={classes.tile__remove}>
        <div
          className={classes.tile__button}
          onClick={() => onRemoveHandler(movie)}
        >
          X
        </div>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className={classes.sectionname}>WATCH LIST</div>
      <div className={classes.contain}>
        <div className={classes.row}>{listMovies}</div>
      </div>
    </>
  );
};

export default MovieList;
