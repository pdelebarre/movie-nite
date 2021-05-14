import React, { useState } from "react";

const MovieGenres = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchGenres = async (e) => {
    e.preventDefault();
    console.log("fetching genres");

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&id=14`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setIsLoaded(true);
      return data.genres;
    } catch (err) {
      console.error(err);
    }
  };

  const lookupGenre = (id) => {
    return "test";
  };

  const getGenres = (genre_ids) => {
    let arr_genres = [];
    genre_ids.map((genre_id) => {
      arr_genres.push(lookupGenre(genre_id));
    });

    return arr_genres.slice(0, 2);
  };

  return <>{!isLoaded && <div>Loading genres...</div>}</>;
};

export default MovieGenres;
