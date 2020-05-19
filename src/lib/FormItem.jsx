/* eslint-disable handle-callback-err */
import React, { useEffect } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

// input components
import { FormControl } from "@material-ui/core";
import TextInput from "./inputs/textInput";
import TextAreaInput from "./inputs/textAreaInput";
import DynamicTextInput from "./inputs/DynamicTextInput";
import SelectInput from "./inputs/selectInput";
import CheckboxInput from "./inputs/CheckboxInput";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: "100px"
  }
}));

const FormInput = props => {
  switch (props.type) {
    case "checkbox":
      return CheckboxInput(props);
    case "select":
      return SelectInput(props);
    case "dynamictext":
      return DynamicTextInput(props);
    case "textarea":
      return TextAreaInput(props);
    case "text":
      return TextInput(props);
    default:
      return TextInput(props);
  }
};

export const FormItem = ({
  id,
  error,
  touched,
  label,
  variant = "outlined",
  ...props
}) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <FormControl
      fullWidth={true}
      variant={variant}
      className={classes.formControl}
      error={!!(meta.error !== undefined && meta.touched)}
    >
      {/* touched must be a boolean for props and changed to string within individual inputs */}
      {/* Custom inputs in the future may read as boolean, dynamicInputs currently needs this as boolean */}
      <FormInput
        id={id}
        error={!!(meta.error !== undefined && meta.touched)}
        label={label}
        helpertext={meta.error ? meta.error : ""}
        touched={meta.touched}
        value={field.value}
        variant={variant}
        {...props}
      />
    </FormControl>
  );
};

FormItem.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  // touched: PropTypes.bool, // removed, getting weird error between steps
  variant: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeHolder: PropTypes.string,
  options: PropTypes.array // for select and checkbox only
};
