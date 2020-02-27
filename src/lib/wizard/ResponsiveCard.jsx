import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
// Google analytics most common device sizes for current saucenerd website:
// 357x667, 375x812, 414x896, 360x640, 1920x1080
const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    margin: "0 auto",
    padding: "5%",
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      border: "none",
      boxShadow: "none"
    },
    [theme.breakpoints.up("md")]: {
      width: "90%",
      boxShadow: "0 0 10px lightGrey",
      margin: "0 auto 5%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "80%",
      margin: "5% auto"
    },
    [theme.breakpoints.up("xl")]: {
      width: "70%",
      margin: "25% auto 5%"
    }
  }
}));

const ResponsiveCard = ({ component }) => {
  const classes = useStyles();

  return <Card className={classes.root}>{component}</Card>;
};
export default ResponsiveCard;
