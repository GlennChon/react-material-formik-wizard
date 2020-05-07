import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const TextInput = ({
  label,
  error,
  helpertext,
  autoComplete = "off",
  value,
  onChange,
  touched,
  ...rest
}) => {
  return (
    <React.Fragment>
      <TextField
        label={label}
        error={error}
        autoComplete={autoComplete}
        aria-label={label + " Text Input"}
        helperText={error ? helpertext : ""}
        onChange={onChange}
        value={value}
        touched={touched.toString()}
        {...rest}
      />
    </React.Fragment>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: "text",
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  autoComplete: PropTypes.oneOf(["on", "off"]),
  helpertext: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextInput;
