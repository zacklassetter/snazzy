import CircularProgress from "@mui/material/CircularProgress";
import classes from "./LoadingState.module.css";

function LoadingState() {
  return (
    <div className={classes.loadingState}>
      <CircularProgress />
    </div>
  );
}

export default LoadingState;
