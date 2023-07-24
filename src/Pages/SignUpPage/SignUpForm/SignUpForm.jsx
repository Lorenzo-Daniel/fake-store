import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setUser } from "../../../Reducers/userSlice";
//------------------------------------------------------------

import {
  onSubmitFormValidtionHelper
} from "../../../helpers/formHelpers";

//-------------------------------------------------------------------
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

//-------------------------------------------------------------------
import {
  Alert,
  Button,
  Stack,
} from "@mui/material";
import InputForm from "../../../Components/Form Componenets/InputForm";

//--------------------------------------------------------------------------
function SignUpForm() {
  const navigate = useNavigate();
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
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleFisrestoreAdd = async (formValues, userId) => {
    try {
      const db = getFirestore();
      await setDoc(doc(db, "users", userId), formValues);
    } catch (e) {
      console.error(`Error adding document:formValues `, e);
    }
  };

  const handleSubmit = (e) => {
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
    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(true);
        handleFisrestoreAdd(formValues, user.uid);
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
        setErrorSubmit(
          "Something went wrong when submitting the form. Check if you already have an account with this user"
        );
        console.error(error.code);
        console.error(error.message);
      });
  };

  //----------------------------------------------------------------------

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
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
            name="firstName"
            label="First name"
            autoComplete="user-name"
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
            name="lastName"
            label="Last name"
            autoComplete="user-lastName"
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
            name="email"
            label="Email address"
            autoComplete = 'user-email'
          />
          <InputForm
            type={"phone"}
            formValues={formValues}
            setFormValues={setFormValues}
            setFormErrors={setFormErrors}
            setError={setError}
            formErrors={formErrors}
            error={error}
            setErrorSubmit={setErrorSubmit}
            name="phone"
            label="phone number"
            autoComplete='user-phone'
          />
          <InputForm
            type={"password"}
            formValues={formValues}
            setFormValues={setFormValues}
            setFormErrors={setFormErrors}
            setError={setError}
            formErrors={formErrors}
            error={error}
            setErrorSubmit={setErrorSubmit}
            name="password"
            label="password"
            autoComplete='user-password'
          />
    
          <InputForm
            type={"password"}
            formValues={formValues}
            setFormValues={setFormValues}
            setFormErrors={setFormErrors}
            setError={setError}
            formErrors={formErrors}
            error={error}
            setErrorSubmit={setErrorSubmit}
            name="confirmPassword"
            label="Confirm password"
            autoComplete = 'user-confirmPassword'
          />
      
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="outlined"
            sx={{ mt: 4 }}
          >
            {isLoading ? "Sign Up..." : "Sign Up"}
          </Button>
          {errorSubmit && (
            <Alert sx={{ p: 5 }} severity="error">
              {errorSubmit}
              <br />
              {errorSubmit.includes("have an account") && (
                <Link
                  to={"/recover-password"}
                  variant="subtitle2"
                  underline="hover"
                >
                  Forgot password?
                </Link>
              )}
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
