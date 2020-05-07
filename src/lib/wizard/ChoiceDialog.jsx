import React, { useState, useEffect } from "react";
//import { Modal, Button } from "react-bootstrap";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

function ChoiceDialog({
  modalHeader,
  messageHeader,
  message,
  positiveBtnText,
  negativeBtnText,
  handlePositive,
  handleNegative,
  ...props
}) {
  return (
    <Dialog
      {...props}
      aria-labelledby="draft loader"
      aria-describedby="option to load existing draft"
      centered="true"
    >
      <DialogTitle id="contained-modal-title-vcenter">
        {modalHeader}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-content-text">
          {messageHeader}
        </DialogContentText>
        <DialogContentText id="dialog-content-text">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleNegative}>
          {negativeBtnText}
        </Button>
        <Button color="primary" autoFocus onClick={handlePositive}>
          {positiveBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ChoiceDialog;
