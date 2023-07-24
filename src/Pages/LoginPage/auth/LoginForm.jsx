import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setUser } from "../../../Reducers/userSlice";

//------------------------------------------------------------

import {
  onSubmitFormValidtionHelper,
} from "../../../helpers/formHelpers";
//-------------------------------------------------------------

import {
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Alert, Box, Button, Stack } from "@mui/material";
import InputForm from "../../../Components/Form Componenets/InputForm";
//-------------------------------------------------------------------------------

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValues,
      formErrors
    );

    if (hasErrors) {
      console.log("Something went wrong, try again.");
      setError(true);
      setFormErrors(updatedFormErrors);
      return;
    }
    setIsLoading(true);
    fetchSignInMethodsForEmail(auth, formValues.email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setErrorSubmit("The user is not registered");
        setIsLoading(false);
      } else {
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
          .then((userCredential) => {
            setIsLoading(false);
            const user = userCredential.user;
            dispatch(setUser(user));
            dispatch(login());
            setSuccess("successfully logged in");
            setTimeout(() => {
              navigate("/store/all products");
            }, 1000);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error.message);
            setErrorSubmit(
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
          <InputForm
            type={"text"}
            formValues={formValues}
            setFormValues={setFormValues}
            setFormErrors={setFormErrors}
            setError={setError}
            formErrors={formErrors}
            error={error}
            setErrorSubmit={setErrorSubmit}
            name="email"
            label="Email address"
            autoComplete="user-email"
          />
          <InputForm
            type={"text"}
            formValues={formValues}
            setFormValues={setFormValues}
            setFormErrors={setFormErrors}
            setError={setError}
            formErrors={formErrors}
            error={error}
            setErrorSubmit={setErrorSubmit}
            name="password"
            label="Password"
            autoComplete="user-password"
          />
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
          {isLoading ? "Sign in..." : "sign in"}
        </Button>
      </form>
      {success && (
        <Box mt={2} display={"flex"} justifyContent={"center"}>
          <Alert sx={{ py: 2, width: "100%" }} severity="success">
            {success}
          </Alert>
        </Box>
      )}
      {errorSubmit && (
        <Box mt={2} display={"flex"} alignItems={"center"}>
          <Alert
            severity="error"
            sx={{ mt: 1, width: "100%", display: "flex", alignItems: "center" }}
          >
            {errorSubmit}
            {errorSubmit === "The user is not registered" && (
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
