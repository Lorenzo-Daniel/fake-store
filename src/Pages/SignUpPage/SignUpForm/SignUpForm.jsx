import { useState } from "react";

import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { login, setUser } from "../../../Reducers/userSlice";

import { onSubmitFormValidtionHelper } from "../../../helpers/formHelpers";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { doc, getFirestore, setDoc } from "firebase/firestore";

import { Alert, Button, Stack } from "@mui/material";

import Form from "../../../Components/FormGroup";
import ModalForm from "../../../Components/Modal/ModalForm";

//--------------------------------------------------------------------------

function SignUpForm() {
  const navigate = useNavigate();
  const [onErrorSubmit, setOnErrorSubmit] = useState(false);
  const [onSuccessSubmit, setOnSuccessSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();
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
  const inputsData = [
    {
      type: "text",
      name: "firstName",
      label: "First name",
      autoComplete: "off",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name",
      autoComplete: "off",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      autoComplete: "off",
    },
    {
      type: "text",
      name: "phone",
      label: "Phone number",
      autoComplete: "off",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      autoComplete: "off",
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm password",
      autoComplete: "off",
    },
  ];

  const formData = {
    setFormValues: setFormValues,
    setFormErrors: setFormErrors,
    formValues: formValues,
    formErrors: formErrors,
  };

  const handleFisrestoreAdd = async (formValues, userId) => {
    try {
      const db = getFirestore();
      await setDoc(doc(db, "users", userId), formValues);
    } catch (e) {
      console.error(`Error adding document:formValues `, e);
    }
  };

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
    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(true);
        handleFisrestoreAdd(formValues, user.uid);
        setTimeout(() => {
          setOnSuccessSubmit(true);
          setShowModal(true);
          setIsLoading(false);
          dispatch(setUser(user));
          dispatch(login());
        }, 2000);
        setTimeout(() => {
          setOnSuccessSubmit(false);
          setShowModal(false);
          navigate("/store/all products");
        }, 4000);
      })
      .catch((error) => {
        setShowModal(true);
        setOnErrorSubmit(
          "Something went wrong when submitting the form. Check if you already have an account with this user"
        );
        setIsLoading(false);
        console.error(error.code);
        console.error(error.message);
      });
  };

  //----------------------------------------------------------------------

  const buttonSubmit = (
    <Button
      disabled={isLoading ? true : false}
      fullWidth
      size="large"
      type="submit"
      variant="outlined"
    >
      {isLoading ? "Sign Up..." : "sing up"}
    </Button>
  );
  const stack = (
    <Stack>
      {onErrorSubmit && (
        <Alert sx={{ p: 5 }} severity="error">
          {onErrorSubmit}
          <Button variant={"text"} onClick={() => setShowModal(false)}>
            Back
          </Button>
          <br />
          {onErrorSubmit.includes("have an account") && (
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
      {onSuccessSubmit && (
        <Alert sx={{ p: 5 }} severity="success">
          SIGN UP SUCCESSFULL!
        </Alert>
      )}
    </Stack>
  );

  return (
    <>
      <Form
        formData={formData}
        inputsData={inputsData}
        onSubmit={onSubmitHandler}
        children={buttonSubmit}
      />
      <ModalForm children={stack} showModal={showModal} />
    </>
  );
}

export default SignUpForm;
