/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Success from "./wizard/Success";
import ProgressBar from "./wizard/ProgressBar";
import ChoiceDialog from "./wizard/ChoiceDialog";
import ResponsiveCard from "./wizard/ResponsiveCard";

import PropTypes from "prop-types";
// TODO: Maybe implement a prompt when user navigates away from unsaved form?

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: "0 auto",
    padding: "0",
    [theme.breakpoints.up("xs")]: {
      margin: "0 auto",
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
    [theme.breakpoints.up("xl")]: {},
  },
}));

export function FormWizard({
  formComponents,
  doSubmit,
  displayProgress = true,
  successTitle,
  successTitleComponent,
  successMessage,
  successMessageComponent,
}) {
  // form
  const [formState, setFormState] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // step
  const [currentStep, setCurrentStep] = useState(0);
  // modal
  const [openDialog, setOpenDialog] = useState(false);
  const [loadDraftData, setLoadDraftData] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    checkDraft();
  }, []);

  useEffect(() => {
    if (Object.entries(formState).length !== 0) {
      saveDraft();
    }
  }, [formState]);

  const handleLoadData = () => {
    if (loadDraftData) {
      let formDraft = JSON.parse(sessionStorage.getItem("recipe_draft"));
      setFormState({ ...formDraft[1] });
      setCurrentStep(formDraft[0]);
    } else {
      sessionStorage.removeItem("recipe_draft");
    }
  };

  const saveDraft = () => {
    let formDraft = JSON.stringify([currentStep, formState]);
    sessionStorage.setItem("recipe_draft", formDraft);
  };
  const next = (values) => {
    setFormState((prevState) => {
      return { ...prevState, ...values };
    });

    setCurrentStep(currentStep + 1);
  };

  const back = (e, values) => {
    e.preventDefault();
    setFormState((prevState) => {
      return { ...prevState, ...values };
    });
    return setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // if user is unregistered
    // cache formState as draft
    // TODO: accept external handler and optional value to check instead of hardcoded author check

    if (formState.author === "Unregistered") {
      console.log("User is unregistered, saving draft");
      saveDraft();
      // test, remove below after testing
      setSubmitSuccess(true);

      // reroute to register
    } else {
      doSubmit(formState);
      setCurrentStep(formComponents.length);
      setSubmitSuccess(true);
    }
  };

  // Modal
  const handlePositive = () => {
    setOpenDialog(false);
    setLoadDraftData(true);
  };

  const handleNegative = () => {
    setOpenDialog(false);
  };

  const checkDraft = () => {
    let formDraft = sessionStorage.getItem("recipe_draft");
    if (formDraft) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  };

  // Display forms
  const displayStep = () => {
    let stepProps = {
      next: next,
      back: back,
      values: formState,
      handleSubmit: handleSubmit,
    };

    return (
      <Grid container direction={"column"} spacing={3}>
        {React.createElement(formComponents[currentStep].component, {
          ...stepProps,
        })}
      </Grid>
    );
  };

  return (
    <Container className={classes.formContainer}>
      <ChoiceDialog
        open={openDialog}
        modalHeader={"Unsubmitted Draft"}
        messageHeader={"Draft Available"}
        message={"A draft has been found, would you like to load it?"}
        positiveBtnText={"Load"}
        negativeBtnText={"Delete"}
        handlePositive={handlePositive}
        handleNegative={handleNegative}
        onExiting={handleLoadData}
      />
      {displayProgress && (
        <ProgressBar steps={[...formComponents]} currentStep={currentStep} />
      )}
      {/* classes.formContainer */}
      {submitSuccess ? (
        <Success
          title={successTitle}
          titleComponent={successTitleComponent}
          message={successMessage}
          messageComponent={successMessageComponent}
        />
      ) : (
        <ResponsiveCard component={displayStep()} />
      )}
    </Container>
  );
}

FormWizard.propTypes = {
  formComponents: PropTypes.array.isRequired,
  doSubmit: PropTypes.func.isRequired,
  displayProgress: PropTypes.bool.isRequired,
  successTitle: PropTypes.string.isRequired,
  successTitleComponent: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  successMessageComponent: PropTypes.string.isRequired,
};
