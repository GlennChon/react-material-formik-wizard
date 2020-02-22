import React, { useState, useEffect } from "react";
//import { Form } from "react-bootstrap";
import {
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from "../../../../example/src/steps/node_modules/@material-ui/core";
import PropTypes from "prop-types";

const CheckboxInput = ({
  options,
  setFieldValue,
  setFieldTouched,
  validateField,
  value,
  ...props
}) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(value ? value : []);
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
    //setFieldTouched(props.name);
    setFieldValue(props.name, tmpArray).then(() => {
      validateField(props.name);
    });
  };
  return (
    <React.Fragment>
      <FormLabel>{props.label}</FormLabel>
      <FormGroup row>
        {options.map((option, key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={values.includes(option.id)}
                onChange={handleChange(option.id)}
                value={option.id}
                onBlur={props.handleBlur}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>{props.helperText}</FormHelperText>
    </React.Fragment>
  );
};

/*
 <React.Fragment>
      <br />
      {options.map((option, key) => (
        <Form.Check id={option.id} inline type="checkbox" key={key}>
          <Form.Check.Input
            onChange={e => {
              handleChange(e);
            }}
            checked={values.includes(option.id)}
          />
          <Form.Check.Label>{option.label}</Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            error message here
          </Form.Control.Feedback>
        </Form.Check>
      ))}
    </React.Fragment>*/
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
  )
};

export default CheckboxInput;
