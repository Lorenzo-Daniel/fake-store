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
  cardNumber: (value) =>
    value.length === 0
      ? "*This field is required"
      : value.length < 8
      ? "Card number must be at least 8 characters"
      : "",
  creditCardExpirationDate: (value) => {
    const today = new Date().getTime();
    console.log(today);
    const enteredValue = new Date(value).getTime()
    console.log(today);
    if (enteredValue <= today) {
      return ("*Your credit card is expired");
    }if(!value ){
     return"*This field is required"
    }
  },
  crediCardSecurityCode: (value) => 
  value.length !== 4 && 
  'Secutiry code must be 4 characters'
  
};

export const handleBlur = (
  e,
  validationConfig,
  setFormErrors,
  setFormValues,
  setError,
  formValues
) => {
  const { name, value } = e.target;
  const validate = validationConfig[name];
  setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  if (validate) {
    const errorMessage = validate(value, formValues);
    setError(true);
    setFormErrors({ [name]: errorMessage });
  }
};

export const handleChange = (e, setError, setFormValues, errorSubmit) => {
  const { name, value } = e.target;
  setError(false);
  errorSubmit("");
  setFormValues((prevValues) => {
    if (prevValues[name] !== value) {
      return { ...prevValues, [name]: value };
    }
    return prevValues;
  });
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
