import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { validationConfig } from "../../helpers/formHelpers";
import Iconify from "../Iconify/Iconify";


//-------------------------------------------------------------------

function InputForm({ formData, inputData, children }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setFormValues, setFormErrors, formValues } = formData;

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validate = validationConfig[name];
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (validate) {
      const errorMessage = validate(value, formValues);
      setFormErrors((prevValues) => ({ ...prevValues, [name]: errorMessage }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      if (prevValues[name] !== value) {
        return { ...prevValues, [name]: value };
      }
      return prevValues;
    });
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <TextField
        type={
          inputData.type === "password" && passwordVisible
            ? "text"
            : inputData.type
        }
        name={inputData.name}
        label={inputData.label}
        autoComplete={inputData?.autoComplete}
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => handleChange(e)}
        InputProps={
          inputData.type === "password"
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
        {formData.formErrors[inputData.name]}
      </Typography>
    </Box>
  );
}

export default InputForm;

// import React, { useState } from "react";
// import { handleBlur, handleChange } from "../../helpers/formHelpers";
// import Iconify from "../Iconify/Iconify";
// import {
//   IconButton,
//   InputAdornment,
//   Box,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { validationConfig } from "../../helpers/formHelpers";

// //-----------------------------------------------------------
// function InputForm({
//   type,
//   formValues,
//   setFormValues,
//   setFormErrors,
//   setError,
//   formErrors,
//   error,
//   setErrorSubmit,
//   name,
//   label,
//   autoComplete,
// }) {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const handleOnChange = (e) =>
//     handleChange(e, setError, setFormValues, setErrorSubmit);

//   const handleTogglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleOnBlur = (e) =>
//     handleBlur(
//       e,
//       validationConfig,
//       setFormErrors,
//       setFormValues,
//       setError,
//       formValues
//     );
//   return (
//     <Box display={"flex"} flexDirection={"column"}>
//       <TextField
//         type={type === "password" && passwordVisible ? "text" : type}
//         name={name}
//         label={label}
//         autoComplete={autoComplete}
//         onBlur={handleOnBlur}
//         onChange={handleOnChange}
//         InputProps={
//           type === "password"
//             ? {
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={handleTogglePasswordVisibility}
//                       edge="end"
//                     >
//                       <Iconify
//                         icon={
//                           passwordVisible ? "eva:eye-fill" : "eva:eye-off-fill"
//                         }
//                       />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }
//             : {}
//         }
//       />
//       <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
//         {error &&  formErrors[name]}
//       </Typography>
//     </Box>
//   );
// }

// export default InputForm;
