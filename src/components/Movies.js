import React from "react";
import Movie from "./Movie/Movie";
import classes from "./Movies.module.css";

const Movies = (props) => {
  return (
    <table className={classes.movies}>
      <thead>
        <tr>
          <th>watched</th>
          <th>title</th>
          <th>genre</th>
          <th>poster</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {props.movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              movie={movie}
              delMovie={props.delMovie}
              markWatched={props.markWatched}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Movies;
