import React from "react";
import "./App.css";
import { Grid, TextField, Button, Container } from "@material-ui/core";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

function App() {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          numberNotes: 5,
        }}
        validationSchema={FormSchema}
        onSubmit={(data) => {
          console.log(data);
          axios
            .get("http://localhost:5000/api/v1/notes/getnotes", {
              params: {
                email: data.email,
                password: data.password,
                numberNotes: data.numberNotes,
              },
            })
            .then((res) => {
              alert(JSON.stringify(res.data, null, 2));
            });
        }}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  helperText={touched.email ? errors.email : ""}
                  label="Email"
                  variant={"outlined"}
                  required
                  fullWidth
                />
              </Grid>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type="password"
                  helperText={touched.password ? errors.password : ""}
                  onChange={handleChange}
                  value={values.password}
                  label="Password"
                  variant={"outlined"}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="numberNotes"
                  type="number"
                  //helperText={touched.password ? errors.password : ""}
                  onChange={handleChange}
                  value={values.numberNotes}
                  label="Number Notes"
                  variant={"outlined"}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="outlined" type="submit">
                  Go
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default App;
