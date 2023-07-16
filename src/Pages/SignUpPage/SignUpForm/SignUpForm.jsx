import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login,setUser} from '../../../Reducers/userSlice'
// import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc} from 'firebase/firestore';
// import { firebaseConfig } from "../../../firebaseConfig/firebaseConfig";

//-------------------------------------------------------------------
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Button } from "@mui/material";
import Iconify from "../../../Components/Iconify/Iconify";

// ----------------------------------------------------------------------

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

//-----------------------------------------------------------------------
// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)

//--------------------------------------------------------------------------
function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formRef = useRef();
  const [signUpSuccess, setsignUpSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFisrestoreAdd = async (formValues) =>{
    try {
      const db = getFirestore()
      const docRef = await addDoc(collection(db, "users"),formValues );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      if (prevValues[name] !== value) {
        return { ...prevValues, [name]: value };
      }
      return prevValues;
    });
  };
 
  const handleSubmit = (e) => {
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
    setFormErrors(updatedFormErrors);
    const hasErrors = Object.values(updatedFormErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) {
      console.log("algo salio mal con el envio del formulario ");
      return;
    }
 
    handleFisrestoreAdd(formValues)
    setIsLoading(true);
    setTimeout(() => {
      setsignUpSuccess(true);
      setIsLoading(false);
      formRef.current.reset();
      dispatch(setUser(formValues))
      dispatch(login())
    }, 2000);
    setTimeout(() => {
      setsignUpSuccess(false);
      navigate('/store/all products')
    }, 4000);
  };

  //----------------------------------------------------------------------

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Stack spacing={3}>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="firstName"
              label="First name"
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.firstName}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="lastName"
              label="Last name"
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
            />

            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.lastName}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="email"
              autoComplete="user-name"
              label="Email address"
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.email}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="password"
              autoComplete="new-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.password}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="confirmPassword"
              label="Confirm password"
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              onBlur={(e) => handleBlur(e)}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showConfirmPassword
                            ? "eva:eye-fill"
                            : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {formErrors?.confirmPassword}
            </Typography>
          </Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="outlined"
            sx={{ mt: 4 }}
          >
            {isLoading ? "Login..." : "Login"}
          </Button>
          {signUpSuccess && (
            <Alert sx={{ p: 5 }} severity="success">
              SIGN UP SUCCESSFULL!
            </Alert>
          )}
        </Stack>
      </form>
    </>
  );
}

export default SignUpForm;
