import React, { useState } from "react";

import classes from "./SearchMovie.module.css";

import Dropdown from "./Dropdown";

const SearchMovie = (props) => {
  const [query, setQuery] = useState("");
  const [newMovie, setNewMovie] = useState({});

  const handleSubmit = () => {
    console.log("submit", newMovie);
    //alert(movie);
    setNewMovie({});
    setQuery("");
  };
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const onAddHandler = (movie) => {
    setNewMovie(movie);
    console.log("received from child", newMovie);
    props.onAddHandler(movie);
  };

  return (
    <div className={classes.contain}>
      <div className={classes.searchbar}>
        <form onSubmit={handleSubmit}>
          <label className={classes.label}>
            Movie:
            <input className={classes.input} type="text" value={query} onChange={handleChange} />
          </label>
          <input className={classes.button} type="submit" value="OK" />
        </form>
      </div>

      <div className={classes.row}>
        {query && <Dropdown onAddHandler={onAddHandler} query={query} />}
      </div>

      
    </div>
  );
};

export default SearchMovie;
