import React, { useState } from "react";

import { GoEye, GoEyeClosed } from "react-icons/go";
import Overview from "../Movie/Overview";

import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const onRemoveHandler = (movie) => {
    props.onRemoveHandler(movie);
  };

  const onWatchedHandler = (movie) => {
    props.onWatchedHandler(movie);
  };

  const onDetailsHandler = () => {
    console.log("getting details of movie :>> ", props.movie.id);
    setShowDetails(true);
  };

  const onCloseHandler = () => {
    setShowDetails(st => !st);
  }

  return (
    <div className={classes.tile}>
      <div className={classes.tile__media}>
        <img
          className={classes.tile__img}
          src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          alt="movie"
        ></img>
      </div>
      <div className={classes.tile__details}>
        <div className={classes.tile__title}>{props.movie.title}</div>
        <div className={classes.tile__more}>
          <div
            className={classes.tile__button}
            onClick={onDetailsHandler}
          >
            ...
          </div>
          {/* TODO: add link to overview (Modal?) */}
          {showDetails && <Overview onClose={onCloseHandler} movie_id={props.movie.id} />}
        </div>
        <div className={classes.tile__watched}>
          <div
            className={classes.tile__button}
            onClick={() => onWatchedHandler(props.movie)}
          >
            {props.movie.watched ? <GoEye /> : <GoEyeClosed />}
          </div>
        </div>
        <div className={classes.tile__remove}>
          <div
            className={classes.tile__button}
            onClick={() => onRemoveHandler(props.movie)}
          >
            X
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
