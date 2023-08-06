import {
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useState } from "react";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import Form from "../../Components/FormGroup";

import ModalForm from "../../Components/Modal/ModalForm";

import { onSubmitFormValidtionHelper } from "../../helpers/formHelpers";

function RecoverPasswordForm() {
  const [onErrorSubmit, setOnErrorSubmit] = useState(false);
  const [onSuccessSubmit, setOnSuccessSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();

  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const inputsData = [
    {
      type: "text",
      name: "email",
      label: "Enter your email",
      autoComplete: "off",
    },
  ];

  const formData = {
    setFormValues: setFormValues,
    setFormErrors: setFormErrors,
    formValues: formValues,
    formErrors: formErrors,
  };

  const onSubmitHandler = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValues,
      formErrors
    );

    if (hasErrors) {
      setFormErrors(updatedFormErrors);
      return;
    }

    setIsLoading(true);
    fetchSignInMethodsForEmail(auth, formValues.email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setOnErrorSubmit("The user is not registered");
        setIsLoading(false);
        setShowModal(true);
        return;
      } else {
        sendPasswordResetEmail(auth, formValues.email)
          .then(() => {
            setShowModal(true);
            setOnSuccessSubmit(
              "We have sent you a message to your email, check your inbox"
            );
            setOnErrorSubmit(false);
            setIsLoading(false);
          })
          .catch((error) => {
            setShowModal(true);
            setOnErrorSubmit(
              "Something went wrong with the shipment, try again"
            );
            setIsLoading(false);
            console.error(error);
          });
      }
    });
  };

  const buttonSubmit = (
    <Box sx={{ mt: 2 }}>
      <Typography>
        We will send you a link to your email to recover your password
      </Typography>
      <Box display={"flex"} justifyContent={"end"}>
        <Button size="small" type="submit" variant="text">
          {isLoading ? "sending..." : "send email"}
        </Button>
      </Box>
    </Box>
  );

  const stack = (
    <Stack>
      {onErrorSubmit && (
        <Alert sx={{ p: 5 }} severity="error">
          {onErrorSubmit}
          <Button variant={"text"} onClick={() => setShowModal(false)}>
            Back
          </Button>
        </Alert>
      )}
      {onSuccessSubmit && (
        <Alert sx={{ p: 5 }} severity="success">
          {onSuccessSubmit}
          <Link
            to={"/loginPage"}
            variant={"text"}
            className="ms-2"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Ok!
          </Link>
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

export default RecoverPasswordForm;
