import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UsersSearchForm = (props) => {
  const submit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{ term: "" }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UsersSearchForm;
