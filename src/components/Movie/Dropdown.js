
import React, { useEffect, useState } from "react";

import classes from "./Dropdown.module.css";

import Overview from "./Overview";

import { TMDB_API_KEY } from "../../store/keys";

const Dropdown = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      console.log("in dropdown, query = ", props.query);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${props.query}&page=1&include_adult=false`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (data.results && data.results.length > 0) {
          setResults(data.results);
        }
      } catch (err) {
        console.error(err);
      }
    }, [1000]);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [props.query]);

  const onAddHandler = (movie) => {
    props.onAddHandler(movie);
  };


  const onDetailsHandler = (movie) => {
    console.log('movie :>> ', movie);
    
  }

  const listMovies = results.map((movie) => (

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
          {movie.title}
          </div>
          <div className={classes.tile__more} onClick={()=>onDetailsHandler(movie)}>...</div>
          <div className={classes.tile__add} onClick={()=>onAddHandler(movie)}>+</div>
      
        </div>
    </div>
  ));
  return (
    <div className={classes.row}>
      <div className={classes.row__inner}>{listMovies}</div>
    </div>
  );
};

export default Dropdown;
