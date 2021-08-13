import React from "react";

import classes from "./MovieList.module.css";

import MovieCard from "../Card/MovieCard";

const MovieList = (props) => {
  const listMovies = props.movies.map((movie) => {
    return (
      <MovieCard
        key={movie._id}
        movie={movie}
        onRemoveHandler={props.onRemoveHandler}
        onWatchedHandler={props.onWatchedHandler}
      />
    );
  });

  return (
    <div className={classes.contain}>
      <div className={classes.sectionname}>WATCH LIST</div>

      <div className={classes.row}>
        <div className={classes.row_inner}>{listMovies}</div>
      </div>
    </div>
  );
};

export default MovieList;
