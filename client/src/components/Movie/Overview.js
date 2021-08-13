import React, { useState, useEffect } from "react";

import classes from "./Overview.module.css";

import Modal from "../UI/Modal";

import { TMDB_API_KEY } from "../../store/keys";

const Overview = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${props.movie_id}?api_key=${TMDB_API_KEY}&language=en-US`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      setMovie(data);
    };
    getDetails();
  }, [props.movie_id]);

  const details = (
    <div className={classes.modal}>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        align="left"
        alt="poster"
      />
      <div className={classes.overview}>
        <h2>{movie.title}</h2>
        <div className={classes.overview}>{movie.overview}</div>
        <p>
          vote average: {movie.vote_average} - vote count: {movie.vote_count}
        </p>
        <div className={classes.financials}>budget: {movie.budget}</div>
      </div>

    </div>
  );

  return (
    <Modal onBackdropClick={props.onClose}>
      <span>{details}</span>;
      <div className={classes.actions}>
        <button onClick={props.onClose}>OK</button>
      </div>
    </Modal>
  );
};

export default Overview;
