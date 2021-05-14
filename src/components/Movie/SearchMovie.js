import React, { useState, useEffect } from "react";
import Results from "../Search/Results";
import classes from "./SearchMovie.module.css";

export default function SearchMovie(props) {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
 // const [isVisible, setIsVisible] = useState(false);

  // const searchMovies = async (e) => {
  //   e.preventDefault();
  //   console.log("submitting");

  //   const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     console.log(data);
  //     setResults(data.results);
  //     //setIsVisible(true);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      //e.preventDefault();
      console.log(query);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
      try{

        
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        // setIsLoaded(true);
        setResults(data.results);
        //setIsVisible(true);
      }
        catch (err) {
          console.error(err);
        }
    }, [1000]);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const onChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onSelectHandler = (movie) => {
    //setIsVisible(query.length() > 1);
    return props.onSelect(movie);
  };

  return (
    <>
      <form className={classes["search-form"]}>
        <label className={classes["search-label"]} htmlFor="query">
          Movie Name
        </label>
        <input
          className={classes["search-input"]}
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          onChange={onChangeHandler}
          value={query}
        />
        {/* {query.length > 0 && (
          <button className={classes["search-button"]} type="submit">
            Search
          </button>
        )} */}
      </form>
      {results != null && <Results results={results} onSelect={onSelectHandler} />}
    </>
  );
}
