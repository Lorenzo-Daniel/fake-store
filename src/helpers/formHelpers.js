export const validationConfig = {
  firstName: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 3
      ? "First name must be at least 3 characters"
      : "",

  lastName: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 3
      ? "Last name must be at least 3 characters"
      : "",
  email: (value) =>
    value.length === 0
      ? "*This field is required"
      : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ? ""
      : "Email is invalid",
  password: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 8
      ? "Password must be at least 8 characters"
      : "",
  confirmPassword: (value, formValues) =>
    value.length === 0
      ? "*This field is required"
      : value !== formValues.password
      ? "Passwords do not match"
      : "",
  phone: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 9
      ? "Phone number must be at least 9 characters"
      : "",
  creditCardNumber: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 8
      ? "Card number must be at least 8 characters"
      : "",
  creditCardExpirationDate: (value) => {
    const today = new Date().getTime();
    const enteredValue = new Date(value).getTime();
    if (enteredValue <= today) {
      return "*Your credit card is expired";
    }
    if (!value) {
      return "*This field is required";
    }else{return ''}

  },
  creditCardSecurityCode: (value) =>
    value.length !== 4 ? "Secutiry code must be 4 characters" : "",
  address: (value) => (value.length === 0 ? "*This field is required" : ""),
  city: (value) => (value.length === 0 ? "*This field is required" : ""),
  postalCode: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 4
      ? "Postal code must be at least 4characters"
      : "",
};

export const onSubmitFormValidtionHelper = (e, formValues, formErrors) => {
  e.preventDefault();
  const updatedFormErrors = Object.keys(formValues).reduce(
    (errors, fieldName) => {
      const validate = validationConfig[fieldName];
      const value = formValues[fieldName];
      const errorMessage = validate ? validate(value, formValues) : "";
      if (errors[fieldName] !== errorMessage) {
        return { ...errors, [fieldName]: errorMessage };
      }
      return errors;
    },
    formErrors
  );

  const hasErrors = Object.values(updatedFormErrors).some(
    (error) => error !== ""
  );
  return { updatedFormErrors: updatedFormErrors, hasErrors };
};
