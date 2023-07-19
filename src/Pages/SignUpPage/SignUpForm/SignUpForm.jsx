import { useState, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../../Reducers/userSlice";
import Iconify from "../../../Components/Iconify/Iconify";
//------------------------------------------------------------

import {
  handleBlur,
  validationConfig,
  handleChange,
} from "../../../helpers/formHelpers";

//-------------------------------------------------------------------
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

//-------------------------------------------------------------------
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Alert,
  Button,
} from "@mui/material";

//--------------------------------------------------------------------------
function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [signUpSuccess, setsignUpSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const formRef = useRef();
  const dispatch = useDispatch();

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

  const handleFisrestoreAdd = async (formValues) => {
    try {
      const db = getFirestore();
      // eslint-disable-next-line
      const docRef = await addDoc(collection(db, "users"), formValues);
    } catch (e) {
      console.error(`Error adding document:formValues `, e);
    }
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

  const handleOnChange = (e) =>
    handleChange(e, setError, setFormValues, setErrorSubmit);

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
      setErrorSubmit("All fields are required!");
      return;
    }
    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(true);
        handleFisrestoreAdd(formValues);
        setTimeout(() => {
          setsignUpSuccess(true);
          setIsLoading(false);
          formRef.current.reset();
          dispatch(setUser(user));
          dispatch(login());
        }, 2000);
        setTimeout(() => {
          setsignUpSuccess(false);
          navigate("/store/all products");
        }, 4000);
      })
      .catch((error) => {
        setErrorSubmit("Something went wrong when submitting the form. Check if you already have an account with this user");
        console.error(error.code);
        console.error(error.message);
      });
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
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {error && formErrors?.firstName}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="lastName"
              label="Last name"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {error && formErrors?.lastName}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="email"
              autoComplete="user-name"
              label="Email address"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
            <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
              {error && formErrors?.email}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="password"
              autoComplete="new-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
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
              {error && formErrors?.password}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="confirmPassword"
              label="Confirm password"
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
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
              {error && formErrors?.confirmPassword}
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
          {errorSubmit && (
            <Alert sx={{ p: 5 }} severity="error">
              {errorSubmit} {errorSubmit.includes('have an account') && <Link to={"/recover-password"} variant="subtitle2" underline="hover">
            Forgot password?
          </Link> }
            </Alert>
          )}
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
