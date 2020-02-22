import React from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Connector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

export default function StepProgressBar({ steps, current }) {
  return (
    <React.Fragment>
      <Stepper activeStep={current} alternativeLabel connector={<Connector />}>
        {steps.map((step, i) => (
          <Step key={i}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </React.Fragment>
  );
}
