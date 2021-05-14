import classes from "./Overview.module.css";
const Overview = (props) => {
  return (
    <div className={classes["grid-container"]}>
      <div className={classes.title}>{props.movie.title}</div>
      <div>
          
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          align="left"
          alt="poster"
        />
        <div className={classes.overview}>{props.movie.overview}</div>
      </div>
    </div>
  );
};

export default Overview;
