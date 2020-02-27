import React from "react";
import { LinearProgress, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function MobileProgressBar({ current, total }) {
  const classes = useStyles();
  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12}>
          <LinearProgress
            className={classes.margin}
            variant="determinate"
            color="primary"
            value={(current / total) * 100}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" alignItems="center">
        <Grid item>{(current / total) * 100}%</Grid>
      </Grid>
    </Container>
  );
}
