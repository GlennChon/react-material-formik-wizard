import React from "react";

import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

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
  placeholder: PropTypes.string,
  helpertext: PropTypes.string,
  autoComplete: PropTypes.string
};
export default TextAreaInput;
