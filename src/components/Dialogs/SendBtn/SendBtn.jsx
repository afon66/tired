import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { maxLengthCreator } from "../../../utils/validators";
import "../../Common/StyleValidation/textareaError.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
  },
}));

const StyledButton = styled(Button)`
  background-color: green;

  & :hover {
    color: blue;
  }
`;

const SendBtn = (props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ message: "" }}
      validate={maxLengthCreator(15, "message")}
      onSubmit={(values, { resetForm }) => {
        props.onSendMessageClick(values.message);
        resetForm();
      }}
    >
      {({ dirty, isValid }) => (
        <Form>
          <Field
            className={!isValid ? "errorRed" : ""}
            as="textarea"
            name="message"
            placeholder="Enter your message"
          />
          <ErrorMessage name="message" component="div" />
          <StyledButton
            type="submit"
            disabled={!dirty || !isValid}
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default SendBtn;
