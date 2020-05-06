import React, { useState, useEffect } from "react";
import {
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from "@material-ui/core";
import PropTypes from "prop-types";

const CheckboxInput = ({
  error,
  touched,
  helpertext,
  options,
  setFieldValue,
  setFieldTouched,
  validateField,
  value,
  ...props
}) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(value || []);
  }, []);

  const handleChange = checkName => e => {
    let tmpArray = [...values];
    if (e.target.checked) {
      tmpArray.push(checkName);
    } else {
      const idx = tmpArray.indexOf(checkName);
      tmpArray.splice(idx, 1);
    }
    setValues(tmpArray);
    setFieldTouched(props.name, true);
    setFieldValue(props.name, tmpArray).then(() => {
      validateField(props.name);
    });
  };
  return (
    <React.Fragment>
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup row>
        {options.map((option, key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                name={option.id}
                checked={values.includes(option.id)}
                onChange={handleChange(option.id)}
                aria-label={option.label + " Checkbox"}
                value={option.id}
                onBlur={props.handleBlur}
                touched={touched.toString()}
                helperText={error ? helpertext : ""}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {error && <FormHelperText>{helpertext}</FormHelperText>}
    </React.Fragment>
  );
};
CheckboxInput.propTypes = {
  type: "text",
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validateField: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ),
  helpertext: PropTypes.string,
  handleBlur: PropTypes.func.isRequired
};

export default CheckboxInput;
