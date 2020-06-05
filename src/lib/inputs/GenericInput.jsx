import React from "react";
import { Input } from "@material-ui/core";
import PropTypes from "prop-types";

const GenericInput = ({
  label,
  error,
  helpertext,
  autoComplete = "off",
  onChange,
  touched,
  onBlur,
  value = "",
  ...props
}) => {
  return (
    <React.Fragment>
      <Input
        label={label}
        error={error}
        autoComplete={autoComplete}
        aria-label={label + " Text Input"}
        helperText={error ? helpertext : ""}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        touched={touched.toString()}
        {...props}
      />
    </React.Fragment>
  );
};

GenericInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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

export default GenericInput;
