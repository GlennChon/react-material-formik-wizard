import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
//import { Form, Button, Row } from "react-bootstrap";
import { Button, Grid, Typography } from "@material-ui/core";
//Inputs
import { FormItem } from "react-material-formik-wizard";

const DisplaySchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  img_url: Yup.string()
    .trim()
    .url("Invalid url")
    .required("Required"),
  author: Yup.string()
});

const DisplayStep = ({ back, next, values = null }) => {
  useEffect(() => {
    mapValues();
  }, []);

  const mapValues = () => {
    values.title = values.title ? values.title : "";
    values.img_url = values.img_url ? values.img_url : "";
    values.author = values.author ? values.author : "Unregistered";
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: values.title,
          img_url: values.img_url,
          author: values.author
        }}
        validationSchema={DisplaySchema}
        onSubmit={values => {
          next({
            title: values.title,
            img_url: values.img_url,
            author: values.author
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
          handleBlur
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
                  Display
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  type="text"
                  name="author"
                  label="Author"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author}
                  error={errors.author}
                  touched={touched.author}
                  InputProps={{ readOnly: true }}
                  defaultValue="Unregistered"
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={errors.title}
                  touched={touched.title}
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  type="text"
                  name="img_url"
                  label="Image URL"
                  placeholder="e.g. https://www.someImageHoster.com/image.png"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.img_url}
                  error={errors.img_url}
                  touched={touched.img_url}
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
export default DisplayStep;
