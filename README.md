# react-material-formik-wizard

> Form wizard using Material-ui, and Formik

[![NPM](https://img.shields.io/npm/v/react-material-formik-wizard.svg)](https://www.npmjs.com/package/react-material-formik-wizard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-material-formik-wizard
```

## Usage

### FormItem

Input component wrapper.
Choose from the following options for the **_type_** property: "checkbox", "select", "dynamictext", "textarea", "text" **_default is text_**

**Props**

```
type: PropTypes.string.isRequired,
label: PropTypes.string.isRequired,
name: PropTypes.string.isRequired,
error: PropTypes.object.isRequired,
touched: PropTypes.object.isRequired,
variant: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
onBlur: PropTypes.func.isRequired,
placeHolder: PropTypes.string,
options: PropTypes.array // for select and checkbox only
value: // PropType is string or array of objects
```

_Select_
Options properties:

```
options={[
{ label: "Condiment", value: "Condiment" },
{ label: "Dip", value: "Dip" },
{ label: "Sauce", value: "Sauce" },
{ label: "Marinade", value: "Marinade" },
{ label: "Other", value: "Other" }
]}
```

_CheckBox_
Options properties:

```
 options={[
  { id: "bitter", label: "Bitter" },
  { id: "numbing", label: "Numbing" },
  { id: "salty", label: "Salty" },
  { id: "sour", label: "Sour" },
  { id: "spicy", label: "Spicy" },
  { id: "sweet", label: "Sweet" },
  { id: "umami", label: "Umami" }
]}
```

### FormWizard

## Example Project

To run the example proect for to see how it is used.

```bash
git clone https://github.com/GlennChon/react-material-formik-wizard.git
```

Move into the cloned directory's example folder and install the dependencies

```bash
cd react-material-formik-wizard/example
npm install
```

Start the project

```bash
npm start
```

Navigate into React

## License

MIT © [GlennChon](https://github.com/GlennChon)
