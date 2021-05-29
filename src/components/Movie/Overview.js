import React from 'react';

import classes from "./Overview.module.css";

import {Pane } from "evergreen-ui";

const Overview = (props) => {
  return (
    <Pane className={classes["container"]}>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/original${props.movie.posterpath}`}
        align="left"
        alt="poster"
      />
      <Pane className={classes.overview}>
        <h2>{props.movie.title}</h2>
        <p>{props.movie.overview}</p>
      </Pane>
    </Pane>
  );
};

export default Overview;
