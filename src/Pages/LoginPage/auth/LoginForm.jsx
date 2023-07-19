import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../../Reducers/userSlice";

//------------------------------------------------------------

import {
  handleBlur,
  validationConfig,
  handleChange,
} from "../../../helpers/formHelpers";
//-------------------------------------------------------------

import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import Iconify from "../../../Components/Iconify/Iconify";

//-------------------------------------------------------------------------------

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorSubmitMessage, setErrorSubmitMessage] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

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
    handleChange(e, setError, setFormValues, setErrorSubmitMessage);

  const onSubmitHandler = (e) => {
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
      console.log("Somthing went wrong , try again.");
      return;
    }
    fetchSignInMethodsForEmail(auth, formValues.email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setErrorSubmitMessage("The user is not registered");
      } else {
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
          .then((userCredential) => {
            const user = userCredential.user;
            dispatch(setUser(user));
            dispatch(login());
            setSuccess("successfully logged in");
            setTimeout(() => {
              navigate("/store/all products");
            }, 1000);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
            setErrorSubmitMessage(
              "something went wrong; Check that the username and password are correct and try again"
            );
            setError(true);
          });
      }
    });
  };

  return (
    <>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <Stack spacing={3}>
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          sx={{ my: 2 }}
        >
          <Link to={"/recover-password"} variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="outlined">
          Sign in
        </Button>
      </form>
      {success && (
        <Box mt={2} display={"flex"} justifyContent={"center"}>
          <Alert sx={{ py: 2, width: "100%" }} severity="success">
            {success}
          </Alert>
        </Box>
      )}
      {errorSubmitMessage && (
        <Box mt={2} display={"flex"} alignItems={"center"}>
          <Alert
            severity="error"
            sx={{ mt: 1, width: "100%", display: "flex", alignItems: "center" }}
          >
            {errorSubmitMessage}
            {errorSubmitMessage === "The user is not registered" && (
              <Link to="/signUp" className="btn text-success">
                Register
              </Link>
            )}
          </Alert>
        </Box>
      )}
    </>
  );
}

export default LoginForm;
