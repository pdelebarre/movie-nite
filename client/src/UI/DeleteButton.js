import React from 'react';

import { RiDeleteBin6Line } from "react-icons/ri";
import classes from "src/UI/DeleteButton.module.css";


import { useMongoDB } from "../store/mongodb";


const DeleteButton = (props) => {
  const { db } = useMongoDB();

  const onDeleteHandler = async () => {
    console.log(`deleting `, props.movie.title);

    const query = { "_id": props.movie._id };

    db
      .collection("movies").deleteOne(query)
      .then(result => console.log(`Deleted ${result.deletedCount} item.`))
      .catch(err => console.error(`Delete failed with error: ${err}`))

  };

  return (
    <RiDeleteBin6Line
      className={classes["delete-button"]}
      onClick={onDeleteHandler.bind(null, props.movie.id)}
    />
  );
};
export default DeleteButton;
