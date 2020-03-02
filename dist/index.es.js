import React, { useState, useEffect, useRef } from 'react';
import { Grid, LinearProgress, Container, Stepper, Step, StepLabel, StepConnector, Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, TextField, IconButton, Divider, FormHelperText, List, ListItem, ListItemText, ListItemSecondaryAction, InputAdornment, Fade, Menu, MenuItem, Typography, Select, InputLabel, FormGroup, FormLabel, FormControlLabel, Checkbox, FormControl } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Add, Clear, Done, MoreHoriz } from '@material-ui/icons';
import { reach } from 'yup';
import { useField } from 'formik';

var useStyles = makeStyles(function (theme) {
  return {
    root: { minHeight: "50vh" }
  };
});
var Success = function Success(_ref) {
  var title = _ref.title,
      titleComponent = _ref.titleComponent,
      message = _ref.message,
      messageComponent = _ref.messageComponent;

  var classes = useStyles();
  var messageView = function messageView() {
    if (message) {
      return React.createElement(
        Grid,
        { item: true, component: messageComponent },
        message
      );
    }
    return;
  };

  return React.createElement(
    Grid,
    {
      className: classes.root,
      container: true,
      direction: "column",
      justify: "center",
      alignItems: "center"
    },
    React.createElement(
      Grid,
      { item: true, component: titleComponent },
      title
    ),
    messageView()
  );
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function useWindowSize() {
  var isClient = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,

      height: isClient ? window.innerHeight : undefined
    };
  }

  var _useState = useState(getSize),
      _useState2 = slicedToArray(_useState, 2),
      windowSize = _useState2[0],
      setWindowSize = _useState2[1];

  useEffect(function () {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    return function () {
      return window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

var useStyles$1 = makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    margin: {
      margin: theme.spacing(1)
    }
  };
});

function MobileProgressBar(_ref) {
  var current = _ref.current,
      total = _ref.total;

  var classes = useStyles$1();
  return React.createElement(
    Container,
    null,
    React.createElement(
      Grid,
      { container: true, justify: "center" },
      React.createElement(
        Grid,
        { item: true, xs: 12 },
        React.createElement(LinearProgress, {
          className: classes.margin,
          variant: "determinate",
          color: "primary",
          value: current / total * 100
        })
      )
    ),
    React.createElement(
      Grid,
      { container: true, justify: "flex-end", alignItems: "center" },
      React.createElement(
        Grid,
        { item: true },
        current / total * 100,
        "%"
      )
    )
  );
}

var Connector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

function StepProgressBar(_ref) {
  var steps = _ref.steps,
      current = _ref.current;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Stepper,
      { activeStep: current, alternativeLabel: true, connector: React.createElement(Connector, null) },
      steps.map(function (step, i) {
        return React.createElement(
          Step,
          { key: i },
          React.createElement(
            StepLabel,
            null,
            step.title
          )
        );
      })
    )
  );
}

var ProgressBar = function ProgressBar(_ref) {
  var steps = _ref.steps,
      currentStep = _ref.currentStep;

  var _useState = useState(true),
      _useState2 = slicedToArray(_useState, 2),
      progressFitsScreen = _useState2[0],
      setProgressFitsScreen = _useState2[1];

  var windowSize = useWindowSize();
  useEffect(function () {
    var checkFit = function checkFit(windowSize) {
      var stepsCount = Object.keys(steps).length;
      var pixelWidthLimit = 60 * (stepsCount - 1) + 200;
      if (windowSize.width < pixelWidthLimit) {
        setProgressFitsScreen(false);
      } else {
        setProgressFitsScreen(true);
      }
    };
    checkFit(windowSize);
  }, [windowSize]);
  return React.createElement(
    Container,
    { style: { paddingTop: "40px" } },
    progressFitsScreen ? React.createElement(StepProgressBar, { current: currentStep, steps: steps }) : React.createElement(MobileProgressBar, { current: currentStep, total: steps.length })
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.object.isRequired,
  currentStep: PropTypes.number.isRequired
};

function ChoiceDialog(_ref) {
  var modalHeader = _ref.modalHeader,
      messageHeader = _ref.messageHeader,
      message = _ref.message,
      positiveBtnText = _ref.positiveBtnText,
      negativeBtnText = _ref.negativeBtnText,
      handlePositive = _ref.handlePositive,
      handleNegative = _ref.handleNegative,
      props = objectWithoutProperties(_ref, ["modalHeader", "messageHeader", "message", "positiveBtnText", "negativeBtnText", "handlePositive", "handleNegative"]);

  return React.createElement(
    Dialog,
    _extends({}, props, {
      "aria-labelledby": "draft loader",
      "aria-describedby": "option to load existing draft",
      centered: true
    }),
    React.createElement(
      DialogTitle,
      { id: "contained-modal-title-vcenter" },
      modalHeader
    ),
    React.createElement(
      DialogContent,
      null,
      React.createElement(
        DialogContentText,
        { id: "dialog-content-text" },
        React.createElement(
          "h3",
          null,
          messageHeader
        ),
        React.createElement(
          "p",
          null,
          message
        )
      )
    ),
    React.createElement(
      DialogActions,
      null,
      React.createElement(
        Button,
        { color: "secondary", onClick: handleNegative },
        negativeBtnText
      ),
      React.createElement(
        Button,
        { color: "primary", autofocus: true, onClick: handlePositive },
        positiveBtnText
      )
    )
  );
}

// Google analytics most common device sizes for current saucenerd website:
// 357x667, 375x812, 414x896, 360x640, 1920x1080
var useStyles$2 = makeStyles(function (theme) {
  var _root;

  return {
    root: (_root = {
      width: "60%",
      margin: "0 auto",
      padding: "5%"
    }, defineProperty(_root, theme.breakpoints.up("xs"), {
      width: "100%",
      border: "none",
      boxShadow: "none"
    }), defineProperty(_root, theme.breakpoints.up("md"), {
      width: "90%",
      boxShadow: "0 0 10px lightGrey",
      margin: "0 auto 5%"
    }), defineProperty(_root, theme.breakpoints.up("lg"), {
      width: "80%",
      margin: "5% auto"
    }), defineProperty(_root, theme.breakpoints.up("xl"), {
      width: "70%",
      margin: "25% auto 5%"
    }), _root)
  };
});

var ResponsiveCard = function ResponsiveCard(_ref) {
  var component = _ref.component;

  var classes = useStyles$2();

  return React.createElement(
    Card,
    { className: classes.root },
    component
  );
};

/* eslint-disable no-undef */
// TODO: Maybe implement a prompt when user navigates away from unsaved form?

var useStyles$3 = makeStyles(function (theme) {
  var _formContainer;

  return {
    formContainer: (_formContainer = {
      margin: "0 auto",
      padding: "0"
    }, defineProperty(_formContainer, theme.breakpoints.up("xs"), {
      margin: "0 auto",
      width: "100%"
    }), defineProperty(_formContainer, theme.breakpoints.up("md"), {}), defineProperty(_formContainer, theme.breakpoints.up("lg"), {}), defineProperty(_formContainer, theme.breakpoints.up("xl"), {}), _formContainer)
  };
});

function FormWizard(_ref) {
  var formComponents = _ref.formComponents,
      doSubmit = _ref.doSubmit,
      _ref$displayProgress = _ref.displayProgress,
      displayProgress = _ref$displayProgress === undefined ? true : _ref$displayProgress,
      successTitle = _ref.successTitle,
      successTitleComponent = _ref.successTitleComponent,
      successMessage = _ref.successMessage,
      successMessageComponent = _ref.successMessageComponent;

  // form
  var _useState = useState({}),
      _useState2 = slicedToArray(_useState, 2),
      formState = _useState2[0],
      setFormState = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = slicedToArray(_useState3, 2),
      submitSuccess = _useState4[0],
      setSubmitSuccess = _useState4[1];
  // step


  var _useState5 = useState(0),
      _useState6 = slicedToArray(_useState5, 2),
      currentStep = _useState6[0],
      setCurrentStep = _useState6[1];
  // modal


  var _useState7 = useState(false),
      _useState8 = slicedToArray(_useState7, 2),
      openDialog = _useState8[0],
      setOpenDialog = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = slicedToArray(_useState9, 2),
      loadDraftData = _useState10[0],
      setLoadDraftData = _useState10[1];

  var classes = useStyles$3();

  useEffect(function () {
    checkDraft();
  }, []);

  useEffect(function () {
    if (Object.entries(formState).length !== 0) {
      saveDraft();
    }
  }, [formState]);

  var handleLoadData = function handleLoadData() {
    if (loadDraftData) {
      var formDraft = JSON.parse(sessionStorage.getItem("recipe_draft"));
      setFormState(_extends({}, formDraft[1]));
      setCurrentStep(formDraft[0]);
    } else {
      sessionStorage.removeItem("recipe_draft");
    }
  };

  var saveDraft = function saveDraft() {
    var formDraft = JSON.stringify([currentStep, formState]);
    sessionStorage.setItem("recipe_draft", formDraft);
  };
  var next = function next(values) {
    setFormState(function (prevState) {
      return _extends({}, prevState, values);
    });

    setCurrentStep(currentStep + 1);
  };

  var back = function back(e, values) {
    e.preventDefault();
    setFormState(function (prevState) {
      return _extends({}, prevState, values);
    });
    return setCurrentStep(currentStep - 1);
  };

  var handleSubmit = function handleSubmit() {
    // if user is unregistered
    // cache formState as draft
    // TODO: accept external handler and optional value to check instead of hardcoded author check

    if (formState.author === "Unregistered") {
      console.log("User is unregistered, saving draft");
      saveDraft();
      // test, remove below after testing
      setSubmitSuccess(true);

      // reroute to register
    } else {
      doSubmit(formState);
      setCurrentStep(formComponents.length);
      setSubmitSuccess(true);
    }
  };

  // Modal
  var handlePositive = function handlePositive() {
    setOpenDialog(false);
    setLoadDraftData(true);
  };

  var handleNegative = function handleNegative() {
    setOpenDialog(false);
  };

  var checkDraft = function checkDraft() {
    var formDraft = sessionStorage.getItem("recipe_draft");
    if (formDraft) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  };

  // Display forms
  var displayStep = function displayStep() {
    var stepProps = {
      next: next,
      back: back,
      values: formState,
      handleSubmit: handleSubmit
    };

    return React.createElement(
      Grid,
      { container: true, direction: "column", spacing: 3 },
      React.createElement(formComponents[currentStep].component, _extends({}, stepProps))
    );
  };

  return React.createElement(
    Container,
    { className: classes.formContainer },
    React.createElement(ChoiceDialog, {
      open: openDialog,
      modalHeader: "Unsubmitted Draft",
      messageHeader: "Draft Available",
      message: "A draft has been found, would you like to load it?",
      positiveBtnText: "Load",
      negativeBtnText: "Delete",
      handlePositive: handlePositive,
      handleNegative: handleNegative,
      onExiting: handleLoadData
    }),
    displayProgress && React.createElement(ProgressBar, { steps: [].concat(toConsumableArray(formComponents)), currentStep: currentStep }),
    submitSuccess ? React.createElement(Success, {
      title: successTitle,
      titleComponent: successTitleComponent,
      message: successMessage,
      messageComponent: successMessageComponent
    }) : React.createElement(ResponsiveCard, { component: displayStep() })
  );
}

FormWizard.propTypes = {
  formComponents: PropTypes.object.isRequired,
  doSubmit: PropTypes.func.isRequired,
  displayProgress: PropTypes.bool.isRequired,
  successTitle: PropTypes.string.isRequired,
  successTitleComponent: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  successMessageComponent: PropTypes.string.isRequired
};

var TextInput = function TextInput(_ref) {
  var label = _ref.label,
      error = _ref.error,
      helpertext = _ref.helpertext,
      _ref$autoComplete = _ref.autoComplete,
      autoComplete = _ref$autoComplete === undefined ? "off" : _ref$autoComplete,
      value = _ref.value,
      onChange = _ref.onChange,
      touched = _ref.touched,
      rest = objectWithoutProperties(_ref, ["label", "error", "helpertext", "autoComplete", "value", "onChange", "touched"]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(TextField, _extends({
      label: label,
      error: error,
      autoComplete: autoComplete,
      "aria-label": label + " Text Input",
      helperText: error ? helpertext : "",
      onChange: onChange,
      value: value,
      touched: touched.toString()
    }, rest))
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
  autoComplete: PropTypes.oneOfType(["on", "off", PropTypes.string]),
  helpertext: PropTypes.string,
  placeholder: PropTypes.string
};

var TextAreaInput = function TextAreaInput(_ref) {
  var label = _ref.label,
      error = _ref.error,
      helpertext = _ref.helpertext,
      _ref$autoComplete = _ref.autoComplete,
      autoComplete = _ref$autoComplete === undefined ? "off" : _ref$autoComplete,
      touched = _ref.touched,
      rest = objectWithoutProperties(_ref, ["label", "error", "helpertext", "autoComplete", "touched"]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(TextField, _extends({
      rows: 5,
      label: label,
      error: error,
      multiline: true,
      autoComplete: autoComplete,
      "aria-label": label + " Text Input",
      helperText: error ? helpertext : "",
      touched: touched.toString()
    }, rest))
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

// TODO: input and listbox into separate individual components
var useStyles$4 = makeStyles(function (theme) {
  return {
    divider: {
      color: "black",
      height: 40,
      margin: 5
    },
    itemText: { wordWrap: "break-word" }
  };
});
var DynamicTextInput = function DynamicTextInput(_ref) {
  var setFieldValue = _ref.setFieldValue,
      setFieldError = _ref.setFieldError,
      setFieldTouched = _ref.setFieldTouched,
      schema = _ref.schema,
      value = _ref.value,
      touched = _ref.touched,
      handleBlur = _ref.handleBlur,
      variant = _ref.variant,
      props = objectWithoutProperties(_ref, ["setFieldValue", "setFieldError", "setFieldTouched", "schema", "value", "touched", "handleBlur", "variant"]);

  var _useState = useState(""),
      _useState2 = slicedToArray(_useState, 2),
      currentInputValue = _useState2[0],
      setCurrentInputValue = _useState2[1];

  var _useState3 = useState(),
      _useState4 = slicedToArray(_useState3, 2),
      currentIndex = _useState4[0],
      setCurrentIndex = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = slicedToArray(_useState5, 2),
      optionsMenuIndex = _useState6[0],
      setOptionsMenuIndex = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = slicedToArray(_useState7, 2),
      isEdit = _useState8[0],
      setIsEdit = _useState8[1]; // For conditional add/update icon


  var _useState9 = useState(true),
      _useState10 = slicedToArray(_useState9, 2),
      isDisabled = _useState10[0],
      setIsDisabled = _useState10[1];

  var _React$useState = React.useState(null),
      _React$useState2 = slicedToArray(_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var open = Boolean(anchorEl);
  var inputEl = useRef(null);
  var classes = useStyles$4();

  var handleOptionsClick = function handleOptionsClick(e, index) {
    setOptionsMenuIndex(index);
    setAnchorEl(e.currentTarget);
  };

  var handleOptionsClose = function handleOptionsClose() {
    setAnchorEl(null);
  };

  var handleInputSave = function handleInputSave(e) {
    e.preventDefault();
    var newValues = value === undefined ? [] : value;
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

  var handleEdit = function handleEdit(e, index) {
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

  var handleRemove = function handleRemove(e, index) {
    e.preventDefault();
    handleOptionsClose();
    var newValues = value === undefined ? [] : [].concat(toConsumableArray(value));
    newValues.splice(index, 1);
    setCurrentIndex(undefined);
    setCurrentInputValue("");
    setFieldTouched(props.name, true, false);
    setFieldValue(props.name, [].concat(toConsumableArray(newValues)), true);
    setIsEdit(false);
  };

  var handleChange = function handleChange(e) {
    validateInput(e);
    setCurrentInputValue(e.target.value);
  };

  // validation used for input
  var validateInput = function validateInput(e) {
    var nestedSchema = reach(schema, props.name + "[].value");
    nestedSchema.validate(e.target.value).then(function () {
      setFieldError(props.name, undefined);
      setFieldTouched(props.name, true, false);
      setIsDisabled(false);
    }).catch(function (err) {
      setFieldError(props.name, err.message);
      setIsDisabled(true);
    });
  };

  var handleKeyPress = function handleKeyPress(e) {
    if (e.target.name === props.name && e.key === "Enter") {
      if (!isDisabled && touched) {
        handleInputSave(e);
      } else {
        e.preventDefault();
        setFieldTouched(props.name, true, false);
      }
    }
  };

  var handleCancelClick = function handleCancelClick(e) {
    e.preventDefault();
    setIsDisabled(true);
    setIsEdit(false);
    setCurrentInputValue("");
    setCurrentIndex(undefined);
    setFieldError(props.name, undefined);
    setFieldTouched(props.name, false, false);
  };

  var renderListGroup = function renderListGroup() {
    if (value !== undefined) {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          List,
          null,
          value && value.map(function (item, index) {
            return React.createElement(
              ListItem,
              {
                button: true,
                id: index,
                key: index,
                selected: currentIndex === index,
                onClick: function onClick(e) {
                  handleEdit(e, index);
                },
                alignItems: "flex-start"
              },
              React.createElement(ListItemText, {
                className: classes.itemText,
                primary: index + 1 + ". " + item.value
              }),
              React.createElement(
                ListItemSecondaryAction,
                null,
                React.createElement(
                  IconButton,
                  {
                    tabIndex: index,
                    "aria-controls": index + "-options-menu",
                    "aria-haspopup": "true",
                    edge: "end",
                    "aria-label": "item " + index + " options",
                    onClick: function onClick(e) {
                      handleOptionsClick(e, index);
                    }
                  },
                  React.createElement(MoreHoriz, null)
                )
              )
            );
          })
        ),
        React.createElement(
          Menu,
          {
            id: "list-options-menu",
            anchorEl: anchorEl,
            open: open,
            onClose: handleOptionsClose,
            TransitionComponent: Fade
          },
          React.createElement(
            MenuItem,
            {
              key: "edit",
              "aria-label": "edit",
              onClick: function onClick(e) {
                handleEdit(e, optionsMenuIndex);
              }
            },
            "Edit"
          ),
          React.createElement(
            MenuItem,
            {
              key: "delete",
              "aria-label": "delete",
              onClick: function onClick(e) {
                handleRemove(e, optionsMenuIndex);
              }
            },
            "Delete"
          )
        )
      );
    }
  };

  var renderEditingDisplay = function renderEditingDisplay() {
    return React.createElement(
      Typography,
      null,
      !isNaN(currentIndex) && "Editing: " + (currentIndex + 1)
    );
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(TextField, _extends({
      id: props.id,
      autoComplete: "off",
      "aria-label": props.label + " Input and Edit Field",
      value: currentInputValue,
      variant: variant,
      onChange: function onChange(e) {
        handleChange(e);
      },
      touched: touched.toString(),
      onBlur: handleBlur,
      onKeyPress: function onKeyPress(e) {
        return handleKeyPress(e);
      },
      ref: inputEl
    }, props, {
      InputProps: {
        endAdornment: React.createElement(
          InputAdornment,
          { position: "end" },
          React.createElement(
            IconButton,
            {
              onClick: function onClick(e) {
                return handleCancelClick(e);
              },
              title: "Cancel " + props.label + " Input",
              "aria-label": "clear input"
            },
            React.createElement(Clear, null)
          ),
          React.createElement(Divider, { className: classes.divider, orientation: "vertical" }),
          React.createElement(
            IconButton,
            {
              onClick: function onClick(e) {
                return handleInputSave(e);
              },
              title: "Save " + props.label + " Input",
              "aria-label": "add to list",
              disabled: isDisabled
            },
            isEdit ? React.createElement(Done, null) : React.createElement(Add, null)
          )
        )
      }
    })),
    renderEditingDisplay(),
    props.error && React.createElement(
      FormHelperText,
      null,
      props.helpertext
    ),
    renderListGroup()
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

var SelectInput = function SelectInput(_ref) {
  var type = _ref.type,
      id = _ref.id,
      name = _ref.name,
      label = _ref.label,
      error = _ref.error,
      helpertext = _ref.helpertext,
      touched = _ref.touched,
      rest = objectWithoutProperties(_ref, ["type", "id", "name", "label", "error", "helpertext", "touched"]);

  var _useState = useState([]),
      _useState2 = slicedToArray(_useState, 2),
      items = _useState2[0],
      setItems = _useState2[1];

  var inputLabel = React.useRef(null);

  var _React$useState = React.useState(0),
      _React$useState2 = slicedToArray(_React$useState, 2),
      labelWidth = _React$useState2[0],
      setLabelWidth = _React$useState2[1];

  useEffect(function () {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(function () {
    if (rest.options.length === 1) {
      setItems(rest.options);
    } else if (rest.options !== undefined && rest.options !== null) {
      rest.options.unshift({ label: "", value: "" });
      setItems(rest.options);
    } else {
      setItems([{ label: "Loading...", value: "" }]);
    }
  }, [rest.options]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      InputLabel,
      { ref: inputLabel, htmlFor: id },
      label
    ),
    React.createElement(
      Select,
      _extends({
        native: true,
        labelWidth: labelWidth,
        touched: touched.toString(),
        inputProps: { id: id, name: name }
      }, rest),
      items.map(function (item, key) {
        return React.createElement(
          "option",
          { key: key, value: item.value },
          item.label
        );
      })
    ),
    error && React.createElement(
      FormHelperText,
      null,
      helpertext
    )
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
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  helpertext: PropTypes.string,
  placeholder: PropTypes.string
};

var CheckboxInput = function CheckboxInput(_ref) {
  var options = _ref.options,
      setFieldValue = _ref.setFieldValue,
      setFieldTouched = _ref.setFieldTouched,
      validateField = _ref.validateField,
      value = _ref.value,
      props = objectWithoutProperties(_ref, ["options", "setFieldValue", "setFieldTouched", "validateField", "value"]);

  var _useState = useState([]),
      _useState2 = slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  useEffect(function () {
    setValues(value || []);
  }, []);

  var handleChange = function handleChange(checkName) {
    return function (e) {
      var tmpArray = [].concat(toConsumableArray(values));
      if (e.target.checked) {
        tmpArray.push(checkName);
      } else {
        var idx = tmpArray.indexOf(checkName);
        tmpArray.splice(idx, 1);
      }
      setValues(tmpArray);
      setFieldValue(props.name, tmpArray).then(function () {
        validateField(props.name);
      });
    };
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      FormLabel,
      null,
      props.label
    ),
    React.createElement(
      FormGroup,
      { row: true },
      options.map(function (option, key) {
        return React.createElement(FormControlLabel, {
          key: key,
          control: React.createElement(Checkbox, {
            checked: values.includes(option.id),
            onChange: handleChange(option.id),
            value: option.id,
            onBlur: props.handleBlur
          }),
          label: option.label
        });
      })
    ),
    React.createElement(
      FormHelperText,
      null,
      props.helpertext
    )
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
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string
  })),
  helpertext: PropTypes.string,
  handleBlur: PropTypes.func.isRequired
};

/* eslint-disable handle-callback-err */

var useStyles$5 = makeStyles(function (theme) {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      padding: "0 calc(1% + 6px) 0 0"
    }
  };
});

var FormInput = function FormInput(props) {
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

var FormItem = function FormItem(_ref) {
  var id = _ref.id,
      error = _ref.error,
      touched = _ref.touched,
      label = _ref.label,
      _ref$variant = _ref.variant,
      variant = _ref$variant === undefined ? "outlined" : _ref$variant,
      props = objectWithoutProperties(_ref, ["id", "error", "touched", "label", "variant"]);

  var _useField = useField(props),
      _useField2 = slicedToArray(_useField, 2),
      field = _useField2[0],
      meta = _useField2[1];

  var classes = useStyles$5();
  return React.createElement(
    FormControl,
    {
      fullWidth: true,
      variant: variant,
      className: classes.formControl,
      error: !!(meta.error !== undefined && meta.touched)
    },
    React.createElement(FormInput, _extends({
      id: id,
      error: !!(meta.error !== undefined && meta.touched),
      label: label,
      helpertext: meta.error ? meta.error : "",
      touched: meta.touched,
      value: field.value,
      variant: variant
    }, props))
  );
};
FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  options: PropTypes.array // for select and checkbox only
};

export { FormWizard, FormItem };
//# sourceMappingURL=index.es.js.map
