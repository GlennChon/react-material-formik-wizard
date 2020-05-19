import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Divider,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
  TextField,
  Fade,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Add, Clear, Done, MoreHoriz } from "@material-ui/icons";
import PropTypes from "prop-types";
import { reach } from "yup";

// TODO: input and listbox into separate individual components
const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    color: "black",
    height: 40,
    margin: 5
  },
  itemText: { wordWrap: "break-word" }
}));
const DynamicTextInput = ({
  setFieldValue,
  setFieldError,
  setFieldTouched,
  schema,
  value,
  touched,
  handleBlur,
  variant,
  ...props
}) => {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState();
  const [optionsMenuIndex, setOptionsMenuIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false); // For conditional add/update icon
  const [isDisabled, setIsDisabled] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const inputEl = useRef(null);
  const classes = useStyles();

  const handleOptionsClick = (e, index) => {
    setOptionsMenuIndex(index);
    setAnchorEl(e.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleInputSave = e => {
    e.preventDefault();
    const newValues = value === undefined ? [] : value;
    if (!isNaN(currentIndex)) {
      newValues[currentIndex].value = currentInputValue;
    } else {
      newValues.push({ value: currentInputValue });
    }
    setCurrentInputValue("");
    setCurrentIndex(undefined);
    setIsDisabled(true);
    setFieldError(props.name, undefined);
    setFieldValue(props.name, newValues, false);
    setFieldTouched(props.name, false, false);
    setIsEdit(false);
  };

  const handleEdit = (e, index) => {
    e.preventDefault();
    handleOptionsClose();
    setIsEdit(true);
    setIsDisabled(false);
    // index of clicked list item
    setCurrentIndex(index);
    setCurrentInputValue(value[index].value);
    setFieldError(props.name, undefined);
    inputEl.current.focus();
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    handleOptionsClose();
    const newValues = value === undefined ? [] : [...value];
    newValues.splice(index, 1);
    setCurrentIndex(undefined);
    setCurrentInputValue("");
    setFieldTouched(props.name, true, false);
    setFieldValue(props.name, [...newValues], true);
    setIsEdit(false);
  };

  const handleChange = e => {
    validateInput(e);
    setCurrentInputValue(e.target.value);
  };

  // validation used for input
  const validateInput = e => {
    let nestedSchema = reach(schema, `${props.name}[].value`);
    nestedSchema
      .validate(e.target.value)
      .then(() => {
        setFieldError(props.name, undefined);
        setFieldTouched(props.name, true, false);
        setIsDisabled(false);
      })
      .catch(err => {
        setFieldError(props.name, err.message);
        setIsDisabled(true);
      });
  };

  const handleKeyPress = e => {
    if (e.target.name === props.name && e.key === "Enter") {
      if (!isDisabled && touched) {
        handleInputSave(e);
      } else {
        e.preventDefault();
        setFieldTouched(props.name, true, false);
      }
    }
  };

  const handleCancelClick = e => {
    e.preventDefault();
    setIsDisabled(true);
    setIsEdit(false);
    setCurrentInputValue("");
    setCurrentIndex(undefined);
    setFieldError(props.name, undefined);
    setFieldTouched(props.name, false, false);
  };

  const renderListGroup = () => {
    if (value !== undefined) {
      return (
        <React.Fragment>
          <List>
            {value &&
              value.map((item, index) => (
                <ListItem
                  button
                  id={index}
                  key={index}
                  selected={currentIndex === index}
                  onClick={e => {
                    handleEdit(e, index);
                  }}
                  alignItems="flex-start"
                >
                  <ListItemText
                    className={classes.itemText}
                    primary={index + 1 + ". " + item.value}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      tabIndex={index}
                      aria-controls={index + "-options-menu"}
                      aria-haspopup="true"
                      edge="end"
                      aria-label={"item " + index + " options"}
                      onClick={e => {
                        handleOptionsClick(e, index);
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
          <Menu
            id={"list-options-menu"}
            anchorEl={anchorEl}
            open={open}
            onClose={handleOptionsClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              key="edit"
              aria-label="edit"
              onClick={e => {
                handleEdit(e, optionsMenuIndex);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              key="delete"
              aria-label="delete"
              onClick={e => {
                handleRemove(e, optionsMenuIndex);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </React.Fragment>
      );
    }
  };

  const renderEditingDisplay = () => {
    return (
      <Typography>
        {!isNaN(currentIndex) && "Editing: " + (currentIndex + 1)}
      </Typography>
    );
  };
  return (
    <React.Fragment>
      <TextField
        className={classes.root}
        id={props.id}
        autoComplete="off"
        aria-label={props.label + " Input and Edit Field"}
        value={currentInputValue}
        variant={variant}
        onChange={e => {
          handleChange(e);
        }}
        touched={touched.toString()}
        onBlur={handleBlur}
        onKeyPress={e => handleKeyPress(e)}
        ref={inputEl}
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={e => handleCancelClick(e)}
                title={"Cancel " + props.label + " Input"}
                aria-label="clear input"
              >
                <Clear />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                onClick={e => handleInputSave(e)}
                title={"Save " + props.label + " Input"}
                aria-label="add to list"
                disabled={isDisabled}
              >
                {isEdit ? <Done /> : <Add />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {renderEditingDisplay()}
      {props.error && <FormHelperText>{props.helpertext}</FormHelperText>}
      {renderListGroup()}
    </React.Fragment>
  );
};

DynamicTextInput.propTypes = {
  type: "dynamictext",
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  touched: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  helpertext: PropTypes.string
};

export default DynamicTextInput;
