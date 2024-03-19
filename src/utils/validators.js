export const loginValidator = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } 
  // else if (
  //   !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)
  // ) {
  //   errors.password =
  //     "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long";
  // }
  return errors;
}

export const maxLengthCreator = (maxLength, name) => {
  return (values) => {
    const errors = {};
    if (values[name].length > maxLength) {
      errors[name] = `Max length ${maxLength} symbols`;
    }
    return errors
  }
}