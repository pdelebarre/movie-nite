import React from "react";

import classes from "./MovieList.module.css";

const MovieList = (props) => {
  

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
        {/* <div className={classes.tile__more} onClick={()=>onDetailsHandler(movie)}>...</div>
          <div className={classes.tile__add} onClick={()=>onAddHandler(movie)}>+</div> */}
      </div>
    </div>
  ));
  return (
    <div className={classes.row}>
      <div>WATCH LIST</div>
      <div className={classes.row__inner}>{listMovies}</div>
    </div>
  );
};

export default MovieList;
