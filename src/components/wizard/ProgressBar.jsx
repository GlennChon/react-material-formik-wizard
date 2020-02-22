import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Stepper, Step, StepLabel, Chip, Container } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MinimalProgressBar from "./MinimalProgressBar";
import StepProgressBar from "./StepProgressBar";
//TODO better handle responsive progress bar for

const ProgressBar = props => {
  const [progressFitsScreen, setProgressFitsScreen] = useState(true);
  const windowSize = useWindowSize();
  useEffect(() => {
    const checkFit = windowSize => {
      const stepsCount = Object.keys(props.steps).length;
      const pixelWidthLimit = 60 * (stepsCount - 1) + 200;
      if (windowSize.width < pixelWidthLimit) {
        setProgressFitsScreen(false);
      } else {
        setProgressFitsScreen(true);
      }
    };
    checkFit(windowSize);
  }, [windowSize]);
  return (
    <Container style={{ paddingTop: "40px" }}>
      {progressFitsScreen ? (
        <StepProgressBar current={props.currentStep} steps={props.steps} />
      ) : (
        <MinimalProgressBar
          current={props.currentStep}
          total={props.steps.length}
        />
      )}
    </Container>
  );
};

export default ProgressBar;
