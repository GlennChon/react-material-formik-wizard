/* eslint-disable handle-callback-err */
import React from "react";
import { useField } from "../../../../example/src/steps/node_modules/formik";
import PropTypes from "prop-types";

// input components
import { FormControl } from "../../../../example/src/steps/node_modules/@material-ui/core";
import TextInput from "./textInput";
import TextAreaInput from "./textAreaInput";
import DynamicTextInput from "./DynamicTextInput";
import SelectInput from "./selectInput";
import CheckboxInput from "./CheckboxInput";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    padding: "0 calc(1% + 6px) 0 0"
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

function FormItem({ error, touched, variant = "outlined", ...props }) {
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
        id={`${props.name}-${props.type}`}
        error={!!(meta.error !== undefined && meta.touched)}
        label={props.label}
        helpertext={meta.error ? meta.error : ""}
        touched={meta.touched}
        value={field.value}
        variant={variant}
        {...props}
      />
    </FormControl>
  );
}
FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired
};
export default FormItem;
