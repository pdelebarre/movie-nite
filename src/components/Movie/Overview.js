import React from 'react';

import classes from "./Overview.module.css";

const Overview = (props) => {
  return (
    <div className={classes["container"]}>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/original${props.movie.posterpath}`}
        align="left"
        alt="poster"
      />
      <div className={classes.overview}>
        <h2>{props.movie.title}</h2>
        <p>{props.movie.overview}</p>
      </div>
    </div>
  );
};

export default Overview;
