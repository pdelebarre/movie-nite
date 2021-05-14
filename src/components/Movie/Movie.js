import React, { useState } from "react";
import classes from "./Movie.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

import Overview from './Overview';

const Movie = (props) => {
  const [details, setDetails] = useState(false);
  const onDeleteHandler = () => {
    props.delMovie(props.movie.id);
    console.log(`delete`, props.movie.id);
  };

  const onCheckHandler = () => {
    props.markWatched(props.movie.id);
  };

  const onClickHandler = () => {
    setDetails(true);
  };

  const onMouseLeaveHandler = () => {
    setDetails(false);
  };

  return (
    <>
      <tr onClick={onClickHandler} onMouseOver={onClickHandler} onMouseLeave={onMouseLeaveHandler}>
        <td className={classes.watched}>
          <input
            name="watched"
            type="checkbox"
            onChange={onCheckHandler}
            checked={props.movie.watched}
            value={props.movie.watched}
          />
        </td>
        <td>{props.movie.title}</td>
        <td>{props.movie.genres}</td>
        <td className={classes.poster}>
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
            alt="poster"
          />
        </td>
        <td className={classes["delete-button"]}>
          <RiDeleteBin6Line onClick={onDeleteHandler} />
        </td>
      </tr>

      {details && (
        <tr>
          <td colSpan="5"><Overview movie = {props.movie}/></td>
        </tr>
      )}
    </>
  );
};

export default Movie;
