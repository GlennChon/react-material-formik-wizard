import React, { useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { Container } from "@material-ui/core";
import MinimalProgressBar from "./MinimalProgressBar";
import StepProgressBar from "./StepProgressBar";

import PropTypes from "prop-types";

const ProgressBar = ({ steps, currentStep }) => {
  const [progressFitsScreen, setProgressFitsScreen] = useState(true);
  const windowSize = useWindowSize();
  useEffect(() => {
    const checkFit = windowSize => {
      const stepsCount = Object.keys(steps).length;
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
        <StepProgressBar current={currentStep} steps={steps} />
      ) : (
        <MinimalProgressBar current={currentStep} total={steps.length} />
      )}
    </Container>
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired
};

export default ProgressBar;
