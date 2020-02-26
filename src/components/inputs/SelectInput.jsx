import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Select, InputLabel, FormHelperText } from "@material-ui/core";

const SelectInput = ({
  type,
  id,
  name,
  label,
  error,
  helpertext,
  touched,
  ...rest
}) => {
  const [items, setItems] = useState([]);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (rest.options.length === 1) {
      setItems(rest.options);
    } else if (rest.options !== undefined && rest.options !== null) {
      rest.options.unshift({ label: "", value: "" });
      setItems(rest.options);
    } else {
      setItems([{ label: "Loading...", value: "" }]);
    }
  }, [rest.options]);

  return (
    <React.Fragment>
      <InputLabel ref={inputLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <Select
        native
        labelWidth={labelWidth}
        touched={touched.toString()}
        inputProps={{ id: id, name: name }}
        {...rest}
      >
        {items.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      {error && <FormHelperText>{helpertext}</FormHelperText>}
    </React.Fragment>
  );
};

SelectInput.propTypes = {
  type: "select",
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  helpertext: PropTypes.string,
  placeholder: PropTypes.string
};
export default SelectInput;
