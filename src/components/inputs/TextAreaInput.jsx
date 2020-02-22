import React, { useRef, useEffect } from "react";

import { TextField } from "../../../../example/src/steps/node_modules/@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  paper: {
    border: "1px",
    fullWidth: true,
    padding: "2px 4px",
    display: "flex"
  },
  input: { fullWidth: true, padding: "4dp" }
}));

const TextAreaInput = ({
  label,
  error,
  helpertext,
  autoComplete = "off",
  touched,
  ...rest
}) => {
  return (
    <React.Fragment>
      <TextField
        rows={5}
        label={label}
        error={error}
        multiline={true}
        autoComplete={autoComplete}
        aria-label={label + " Text Input"}
        helperText={error ? helpertext : ""}
        touched={touched.toString()}
        {...rest}
      />
    </React.Fragment>
  );
};

TextAreaInput.propTypes = {
  type: "textarea",
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};
export default TextAreaInput;
