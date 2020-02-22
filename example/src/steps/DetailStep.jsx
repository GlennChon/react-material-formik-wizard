import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
//import { Form, Button, Row } from "react-bootstrap";
import { Button, Grid, Typography } from "@material-ui/core";
//Inputs
import { FormItem } from "react-material-formik-wizard";

const DetailSchema = Yup.object().shape({
  amount: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  expiration: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  allergies: Yup.array().of(Yup.string())
});

const DetailStep = ({ next, back, values = null }) => {
  useEffect(() => {
    mapValues();
  }, []);
  const mapValues = () => {
    values.amount = values.amount ? values.amount : [];
    values.expiration = values.expiration ? values.expiration : [];
    values.allergies = values.allergies ? values.allergies : [];
  };
  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{
          amount: values.amount,
          expiration: values.expiration,
          allergies: values.allergies
        }}
        validationSchema={DetailSchema}
        onSubmit={values => {
          next({
            amount: values.amount,
            expiration: values.expiration,
            allergies: values.allergies
          });
        }}
      >
        {({
          isSubmitting,
          values,
          errors,
          handleSubmit,
          handleChange,
          touched,
          handleBlur,
          validateField,
          setFieldValue,
          setFieldTouched
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  type="title"
                  color="inherit"
                  style={{ flex: 1 }}
                >
                  Detail
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  type="text"
                  name="amount"
                  label="Amount"
                  placeholder="e.g. Approximately 2 cups"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  error={errors.amount}
                  touched={touched.amount}
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  type="text"
                  name="expiration"
                  label="Expiration"
                  placeholder="e.g. 1 Week Refridgerated"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expiration}
                  error={errors.expiration}
                  touched={touched.expiration}
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  name="allergies"
                  type="checkbox"
                  label="Contains (Allergies)"
                  options={[
                    { id: "dairy", label: "Dairy" },
                    { id: "eggs", label: "Eggs" },
                    { id: "fish", label: "Fish" },
                    { id: "peanuts", label: "Peanuts" },
                    { id: "shellfish", label: "Shellfish" },
                    { id: "soy", label: "Soy" },
                    { id: "treenuts", label: "Tree Nuts" },
                    { id: "wheat", label: "Wheat" }
                  ]}
                  value={values.allergies}
                  error={errors.allergies}
                  onBlur={handleBlur}
                  validateField={validateField}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  touched={touched.allergies}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="row" justify="space-between">
              <Grid item>
                <Button disabled={isSubmitting} onClick={e => back(e, values)}>
                  Back
                </Button>
              </Grid>
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
        )}
      </Formik>
    </React.Fragment>
  );
};

export default DetailStep;
