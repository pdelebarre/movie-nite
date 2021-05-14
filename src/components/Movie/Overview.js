import classes from './Overview.module.css';
const Overview = (props) => {
    return (<div className={classes.overview}>{props.movie.overview}</div>)
};

export default Overview;