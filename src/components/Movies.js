import React from "react";
import Movie from "./Movie/Movie";

const Movies = (props) => {

      
  return (
    <table>
      <tbody>
      {props.movies.map((movie) => { return (
        <Movie key={movie.id} movie={movie} delMovie={props.delMovie} markWatched={props.markWatched}/>);
      })}
    </tbody>
      </table>
  );
};

export default Movies;
