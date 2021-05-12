import React from "react";

const Movie = (props) => {
  const onDeleteHandler = () => {
    props.delMovie(props.movie.id);
    console.log(`delete`, props.movie.id);
  };

  const onCheckHandler = () => {
    props.markWatched(props.movie.id);
  };

  //   const getImage = () => {
  //     let imageUrl = `https://image.tmdb.org/t/p/original${props.movie.poster_path}`;
  //     console.log(`url`, imageUrl);
  //     return imageUrl;
  //   };

  //const url=props.movie.poster_path;//"/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg";
  return (
    <tr>
      <td>
        <input
          name="watched"
          type="checkbox"
          onChange={onCheckHandler}
          checked={props.movie.watched}
          value={props.movie.watched}
        />
      </td>
      <td>{props.movie.id}</td>
      <td>{props.movie.title}</td>
      <td>{props.movie.genre}</td>
      <td>
        <img
          src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          alt="poster"
          width="30"
          height="45"
        />
      </td>
      <td>
        <button onClick={onDeleteHandler}>Delete</button>
      </td>
    </tr>
  );
};

export default Movie;
