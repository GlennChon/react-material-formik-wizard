import React, { useState, useEffect } from "react";
import { Formik } from "./node_modules/formik";
import { Button, Grid, Typography } from "./node_modules/@material-ui/core";
import * as Yup from "yup";

//Inputs
import FormItem from "../../../src/components/forms/inputs/formItem";

const AboutSchema = Yup.object().shape({
  country: Yup.string()
    .trim()
    .notOneOf([""], "Please select an option")
    .required("Required"),
  sauce_type: Yup.string()
    .trim()
    .notOneOf([""], "Please select an option")
    .required("Required"),
  description: Yup.string()
    .trim()
    .min(3, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  taste_profile: Yup.array()
    .of(Yup.string().required("Need to choose at least 1"))
    .required("Required")
});

const AboutStep = props => {
  const { next, back, values } = props;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      let countriesString = sessionStorage.getItem("countries");
      // if countriesString is null or it has an item with empty string value
      if (
        countriesString === null ||
        JSON.parse(countriesString)[0].value === ""
      ) {
        await fetch("https://restcountries.eu/rest/v2/all")
          .then(response => response.json())
          .then(data => {
            const countryArray = [];
            data.map(country => {
              return countryArray.push({
                label: country.name,
                value: country.name
              });
            });
            sessionStorage.setItem("countries", JSON.stringify(countryArray));
          })
          .catch(err => {
            console.log(err);
            let connErr = [
              { label: "Connection issue, wait and refresh", value: "" }
            ];
            return sessionStorage.setItem("countries", JSON.stringify(connErr));
          });
      }
      return setCountries(JSON.parse(sessionStorage.getItem("countries")));
    };

    const mapValues = () => {
      values.country = values.country ? values.country : "";
      values.sauce_type = values.sauce_type ? values.sauce_type : "";
      values.description = values.description ? values.description : "";
      values.taste_profile = values.taste_profile ? values.taste_profile : [];
    };

    getCountries();
    mapValues();
  }, []);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{
          country: values.country,
          sauce_type: values.sauce_type,
          description: values.description,
          taste_profile: values.taste_profile
        }}
        validationSchema={AboutSchema}
        onSubmit={values => {
          next({
            country: values.country,
            sauce_type: values.sauce_type,
            description: values.description,
            taste_profile: values.taste_profile
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          validateField,
          setFieldValue,
          setFieldTouched
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={0} direction="row" justify="center">
              <Typography
                variant="h2"
                type="title"
                color="inherit"
                style={{ flex: 1 }}
              >
                About
              </Typography>
              <Grid item xs={12}>
                <FormItem
                  id="country"
                  name="country"
                  type="select"
                  label="Country"
                  options={countries}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  error={errors.country}
                  touched={touched.country}
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  id="sauce_type"
                  name="sauce_type"
                  type="select"
                  label="Sauce Type"
                  options={[
                    { label: "Condiment", value: "Condiment" },
                    { label: "Dip", value: "Dip" },
                    { label: "Sauce", value: "Sauce" },
                    { label: "Marinade", value: "Marinade" },
                    { label: "Other", value: "Other" }
                  ]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sauce_type}
                  error={errors.sauce_type}
                  touched={touched.sauce_type}
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  id="description"
                  name="description"
                  type="textarea"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={"Describe your sauce"}
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormItem
                  id="taste_profile"
                  name="taste_profile"
                  type="checkbox"
                  label="Taste Profile"
                  options={[
                    { id: "bitter", label: "Bitter" },
                    { id: "numbing", label: "Numbing" },
                    { id: "salty", label: "Salty" },
                    { id: "sour", label: "Sour" },
                    { id: "spicy", label: "Spicy" },
                    { id: "sweet", label: "Sweet" },
                    { id: "umami", label: "Umami" }
                  ]}
                  onBlur={handleBlur}
                  validateField={validateField}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  value={values.taste_profile}
                  error={errors.taste_profile}
                  touched={touched.taste_profile}
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
export default AboutStep;
