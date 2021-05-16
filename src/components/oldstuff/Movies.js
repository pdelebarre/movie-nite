import React from "react";
import Movie from "./Movie/Movie";
import classes from "./Movies.module.css";

const Movies = (props) => {
  const display = props.movies.length > 0;
  const headers = (
    <thead>
      <tr>
        <th>watched</th>
        <th>title</th>
        <th>genre</th>
        <th>poster</th>
        <th>delete</th>
      </tr>
    </thead>
  );
  return (
    <>
      {display && (
        <table className={classes.movies}>
          {headers}
          <tbody>
            {props.map((movie) => {
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
      )}
    </>
  );
};

export default Movies;
