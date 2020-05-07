import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Grid, Button, Typography } from "@material-ui/core";

//Inputs
import { FormItem } from "react-material-formik-wizard";

//Validation schemas
const RecipeSchema = Yup.object().shape({
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string()
          .trim("Please remove any surrounding white spaces")
          .min(3, "Too Short")
          .max(255, "Too Long")
          .required("*Required")
      })
    )
    .required("At least 1 ingredient required, press + to add"),
  instructions: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string("Please remove any surrounding white spaces")
          .trim("Please remove any surrounding white spaces")
          .min(3, "Too Short")
          .max(255, "Too Long")
          .required("*Required")
      })
    )
    .required("At least 1 instruction required, press + to add"),
  tips: Yup.array().of(
    Yup.object().shape({
      value: Yup.string()
        .trim("Please remove any surrounding white spaces")
        .min(3, "Too Short")
        .max(255, "Too Long")
    })
  )
});

const RecipeForm = ({ ...props }) => {
  const {
    isSubmitting,
    values,
    touched,
    handleSubmit,
    handleBlur,
    errors,
    setFieldTouched,
    setFieldValue,
    setFieldError
  } = props;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0} direction="row" justify="center">
          <Grid item xs={12}>
            <Typography
              variant="h2"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Recipe
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormItem
              id="ingredients"
              name="ingredients"
              label="Ingredients"
              type="dynamictext"
              placeholder="e.g. 1 Cup of Water"
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
              value={values.ingredients}
              error={errors.ingredients}
              schema={RecipeSchema}
              touched={touched.ingredients}
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              id="instructions"
              name="instructions"
              label="Instructions"
              type="dynamictext"
              placeholder="e.g. Stir in salt and sugar"
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
              value={values.instructions}
              error={errors.instructions}
              schema={RecipeSchema}
              touched={touched.instructions}
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              id="tips"
              name="tips"
              label="Tips"
              type="dynamictext"
              placeholder="Any Tips?"
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
              value={values.tips}
              error={errors.tips}
              schema={RecipeSchema}
              touched={touched.tips}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0} direction="row" justify="flex-end">
          <Grid item>
            <Button
              disabled={isSubmitting || Object.entries(errors).length > 0}
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

const RecipeStep = withFormik({
  mapPropsToValues: props => ({
    ingredients:
      props.values.ingredients !== undefined ? props.values.ingredients : [],
    instructions:
      props.values.instructions !== undefined ? props.values.instructions : [],
    tips: props.values.tips !== undefined ? props.values.tips : []
  }),
  validationSchema: RecipeSchema,
  handleSubmit: (values, { props }) => {
    props.next(values);
  },
  enableReinitialize: true,
  displayName: "RecipeStep"
})(RecipeForm);

export default RecipeStep;
