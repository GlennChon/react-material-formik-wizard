import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: { minHeight: "50vh" }
}));
const Success = ({ title, titleComponent, message, messageComponent }) => {
  const classes = useStyles();
  const messageView = () => {
    if (message) {
      return (
        <Grid item component={messageComponent}>
          {message}
        </Grid>
      );
    }
    return;
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item component={titleComponent}>
        {title}
      </Grid>
      {messageView()}
    </Grid>
  );
};

export default Success;
