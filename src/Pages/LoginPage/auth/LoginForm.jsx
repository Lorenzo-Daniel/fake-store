import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setUser } from "../../../Reducers/userSlice";

import { onSubmitFormValidtionHelper } from "../../../helpers/formHelpers";

import {
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";

import Form from "../../../Components/FormGroup";

//-----------------------------------------------------------


function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [onErrorSubmit, setOnErrorSubmit] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [onSuccessSumbit, setOnSuccessSumbit] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

  const formData = {
    setFormValues: setFormValues,
    setFormErrors: setFormErrors,
    formValues: formValues,
    formErrors: formErrors,
  };

  const inputsData = [
    {
      type: "text",
      name: "email",
      label: "Email",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
    },
  ];

  const onSubmitHandler = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValues,
      formErrors
    );

    setIsLoading(true);
    if (hasErrors) {
      setFormErrors(updatedFormErrors);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchSignInMethodsForEmail(auth, formValues.email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setOnErrorSubmit("The user is not registered");
        setIsLoading(false);
      } else {
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
          .then((userCredential) => {
            setIsLoading(false);
            const user = userCredential.user;
            dispatch(setUser(user));
            dispatch(login());
            setOnErrorSubmit("");
            setOnSuccessSumbit("successfully logged in");
            setTimeout(() => {
              navigate("/store/all products");
            }, 1000);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error.message);
            setOnErrorSubmit(
              "something went wrong; Check that the username and password are correct and try again"
            );
          });
      }
    });
  };

  const button = (
    <Stack spacing={1}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button size="small" onClick={() => navigate("/recover-password")}>
          <Typography variant="span" color={"primary"}>
            Forgot your Password?
          </Typography>
        </Button>
      </Box>
      <Button fullWidth size="large" type="submit" variant="outlined">
        {isLoading ? "Sign in..." : "sing in"}
      </Button>
    </Stack>
  );
  return (
    <>
      <Form
        formData={formData}
        inputsData={inputsData}
        onSubmit={onSubmitHandler}
        children={button}
      />
      {onSuccessSumbit && (
        <Box mt={2} display={"flex"} justifyContent={"center"}>
          <Alert sx={{ py: 2, width: "100%" }} severity="success">
            {onSuccessSumbit}
          </Alert>
        </Box>
      )}
      {onErrorSubmit && (
        <Box mt={2} display={"flex"} alignItems={"center"}>
          <Alert
            severity="error"
            sx={{ mt: 1, width: "100%", display: "flex", alignItems: "center" }}
          >
            {onErrorSubmit}

            {onErrorSubmit === "The user is not registered" && (
              <Link to="/signUp" className="btn text-primary">
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
