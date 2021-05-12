import React, { useState } from "react";

const MovieForm = (props) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(`add movie`, title);
    props.addMovie({ title: title, genre: genre });
    setTitle("");
    setGenre("");
  };

  const onChangeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onChangeGenreHandler = (event) => {
    setGenre(event.target.value);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="title"
        placeholder="Enter title..."
        value={title}
        onChange={onChangeTitleHandler}
      />
      <input
        type="text"
        name="genre"
        placeholder="Enter genre..."
        value={genre}
        onChange={onChangeGenreHandler}
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default MovieForm;
