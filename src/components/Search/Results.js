import React from "react";
import classes from "./Results.module.css";

const Results = (props) => {
  return (
    <div className={classes.dropdown}>
      <table className={classes["dropdown-content"]}>
        <thead>
          <tr>
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
              <td>{result.title}</td>
              <td className={classes.vote}>{result.vote_average}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
