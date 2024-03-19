import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { maxLengthCreator } from "../../../../utils/validators";
import "../../../Common/StyleValidation/textareaError.css";
import { useDispatch } from "react-redux";
import { addPost } from "../../../../redux/profile-reducer";

const SendBtn = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ post: "" }}
      validate={maxLengthCreator(10, "post")}
      onSubmit={(values, { resetForm }) => {
        dispatch(addPost(values.post));
        resetForm();
      }}
    >
      {({ dirty, isValid }) => (
        <Form>
          <Field
            className={!isValid ? "errorRed" : ""}
            name="post"
            as="textarea"
            placeholder="enter your post"
          />
          <ErrorMessage name="post" component="div" />
          <button type="submit" disabled={!dirty || !isValid}>
            Post
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SendBtn;
