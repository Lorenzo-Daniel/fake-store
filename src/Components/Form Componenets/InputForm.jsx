import React, { useState } from "react";
import { handleBlur, handleChange } from "../../helpers/formHelpers";
import Iconify from "../Iconify/Iconify";

import {
  IconButton,
  InputAdornment,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { validationConfig } from "../../helpers/formHelpers";

//-----------------------------------------------------------
function InputForm({
  type,
  formValues,
  setFormValues,
  setFormErrors,
  setError,
  formErrors,
  error,
  setErrorSubmit,
  name,
  label,
  autoComplete,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleOnChange = (e) =>
    handleChange(e, setError, setFormValues, setErrorSubmit);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOnBlur = (e) =>
    handleBlur(
      e,
      validationConfig,
      setFormErrors,
      setFormValues,
      setError,
      formValues
    );
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <TextField
        type={type === "password" && passwordVisible ? "text" : type}
        name={name}
        label={label}
        autoComplete={autoComplete}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        InputProps={
          type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          passwordVisible ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
      <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
        {error && formErrors[name]}
      </Typography>
    </Box>
  );
}

export default InputForm;
