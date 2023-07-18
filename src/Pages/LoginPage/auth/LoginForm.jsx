import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../../Reducers/userSlice";
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
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
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

//-------------------------------------------------------------------------------
function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();
  console.log(formValues.email);

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
    setError(false);
    setFormValues((prevValues) => {
      if (prevValues[name] !== value) {
        return { ...prevValues, [name]: value };
      }
      return prevValues;
    });
  };

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
      console.log("Algo salió mal con el envío del formulario");
      return;
    }

    fetchSignInMethodsForEmail(auth, formValues.email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setError(true);
        setErrorMessage("The user is not registered");
      } else {
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
          .then((userCredential) => {
            const user = userCredential.user;
            dispatch(setUser(user));
            dispatch(login());
            setSuccess("Logueado correctamente"); // Reemplazar setError(true) por setSuccess(true)
            setTimeout(() => {
              navigate("/store/all products");
            }, 1000);
          })
          .catch((error) => {
            // Manejo de errores
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setErrorMessage("something went wrong; Check that the username and password are correct and try again");
            setError(true)
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Checkbox name="remember" label="Remember me" />
          <Link to={'/recover-password'}variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="outlined">
          Login
        </Button>
      </form>
      {error && (
        <Box mt={2} display={"flex"} alignItems={"center"}>
          <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
          {errorMessage === "The user is not registered" && (
            <Link to="/signUp" className="btn">
              Register
            </Link>
          )}
        </Box>
      )}
      {success && (
        <Box mt={2} display={"flex"} alignItems={"center"}>
          <Typography variant="caption" color={"error"} sx={{ mt: 1 }}>
            {success}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default LoginForm;
