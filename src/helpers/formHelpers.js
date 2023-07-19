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
  setError(true);

  const validate = validationConfig[name];
  setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  if (validate) {
    const errorMessage = validate(value, formValues);
    setFormErrors((prevErrors) => {
      if (prevErrors[name] !== errorMessage) {
        return { ...prevErrors, [name]: errorMessage };
      }
      return prevErrors;
    });
  }
};


export const handleChange = (e, setError, setFormValues,errorSubmit) => {
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
