import React, { useState } from "react";
import {
  Grid,
  Button,
  List,
  ListItem,
  Typography,
  CardMedia,
  CardContent
} from "@material-ui/core";
import Image from "material-ui-image";

const Review = props => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    props.handleSubmit();
    setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={0} direction="row" justify="center">
        <Grid item xs={12}>
          <Typography
            variant="h2"
            type="title"
            color="inherit"
            style={{ flex: 1 }}
          >
            {props.values.title + " Review"}
          </Typography>
        </Grid>
        <CardMedia
          component="img"
          alt="Image Preview"
          image={props.values.img_url}
          height="350"
          title="Image Preview"
        />
        <CardContent>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Taste Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ChipArray chipData={props.values.taste_profile} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Image Url
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography
                    variant="h5"
                    type="title"
                    color="inherit"
                    style={{ flex: 1 }}
                  >
                    Ingredients
                  </Typography>
                  <List>
                    {props.values.ingredients !== undefined &&
                      props.values.ingredients.map((item, i) => (
                        <ListItem key={i}>
                          <h6>{item.value}</h6>
                        </ListItem>
                      ))}
                  </List>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    variant="h5"
                    type="title"
                    color="inherit"
                    style={{ flex: 1 }}
                  >
                    Instructions
                  </Typography>
                  <List>
                    {props.values.instructions !== undefined &&
                      props.values.instructions.map((item, i) => (
                        <ListItem key={i}>
                          <h4>{`${i + 1}. ${item.value}`}</h4>
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                type="title"
                color="inherit"
                style={{ flex: 1 }}
              >
                Tips
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <List>
                {props.values.tips !== undefined &&
                  props.values.tips.map((item, i) => (
                    <ListItem key={i}>{item.value}</ListItem>
                  ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                type="title"
                color="inherit"
                style={{ flex: 1 }}
              >
                Country
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {props.values.country}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                type="title"
                color="inherit"
                style={{ flex: 1 }}
              >
                Sauce Type
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {props.values.sauce_type}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                type="title"
                color="inherit"
                style={{ flex: 1 }}
              >
                Description
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {props.values.description}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Amount
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {props.values.amount}
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Expiration
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {props.values.expiration}
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Allergies
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {props.values.allergies.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </Grid>
          <Grid item xs={12}>
            {props.values.img_url}
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Author
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {props.values.author}
          </Grid>
          <Grid container spacing={0} direction="row" justify="space-between">
            <Grid item>
              <Button
                disabled={isSubmitting}
                onClick={e => props.back(e, props.values)}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={isSubmitting} onClick={e => handleSubmit(e)}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
