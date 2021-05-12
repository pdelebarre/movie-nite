import React from "react";
import classes from "./Results.module.css";

const Results = (props) => {
  // const onRowClickHandler = result => {
  //     console.log(`captured title`, result.title);
  //     return result;
  // };

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>vote</th>
        </tr>
      </thead>

      <tbody>
        {props.results.map((result) => (
          <tr
            key={result.id}
            className={classes.tr}
            onClick={props.onSelect.bind(null, result)}
          >
            <td>{result.id}</td>
            <td>{result.title}</td>
            <td>{result.vote_average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Results;
