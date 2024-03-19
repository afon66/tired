import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidator } from "../../../utils/validators";
import "../../Common/StyleValidation/inputError.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth-reducer";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const OuterLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: "" }}
        validate={loginValidator}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            login({
              email: values.email,
              password: values.password,
              rememberMe: values.rememberMe,
            })
          );
          if (isAuth) {
            return navigate("/profile");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form className={classes.form}>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <ErrorMessage name="email" component="div" />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ErrorMessage name="password" component="div" />
            <FormControlLabel
              control={
                <Field as={Checkbox} color="primary" name="rememberMe" />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default OuterLogin;
