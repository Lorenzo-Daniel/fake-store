import React from 'react'
import {Typography,Box,TextField} from "@mui/material"

//-------------------------------------------------------------------

const validationConfig = {
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

  //----------------------------------------------------------------------------

function InputForm({setFormValues,formValues,setFormErrors,formErrors,name,label}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => {
          if (prevValues[name] !== value) {
            return { ...prevValues, [name]: value };
          }
          return prevValues;
        });
      };

      const handleBlur = (e) => {
        const { name, value } = e.target;
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
    
  return (
    <>
       <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name='firstName'
              label={'First name'}
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.firstName}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name='firstName'
              label={'First name'}
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.firstName}
            </Typography>
          </Box>
    </>
  )
}

export default InputForm
