import {
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";

//-------------------------------------------------------------------
import { Alert, Stack, Button } from "@mui/material";

// ----------------------------------------------------------------------
import { onSubmitFormValidtionHelper } from "../../helpers/formHelpers";
// ----------------------------------------------------------------------

import InputForm from "../../Components/Form Componenets/InputForm";
function RecoverPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [successSubmit, setSuccessSubmit] = useState("");
  const [formValues, setFormValues] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState({ email: "" });

  const auth = getAuth();

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

    setIsLoading(true);
    fetchSignInMethodsForEmail(auth, formValues.email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setErrorSubmit("The user is not registered");
        setIsLoading(false);
      } else {
        sendPasswordResetEmail(auth, formValues.email)
          .then(() => {
            setSuccessSubmit(
              "We have sent you a message to your email, check your inbox"
            );
            setIsLoading(false);
          })
          .catch((error) => {
            setErrorSubmit("Something went wrong with the shipment, try again");
            setIsLoading(false);

            console.error(error);
          });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <Button fullWidth size="large" type="submit" variant="outlined">
            {isLoading ? "sending..." : "send email"}
          </Button>
          {errorSubmit && (
            <Alert sx={{ p: 5 }} severity="error">
              {errorSubmit}
            </Alert>
          )}
          {successSubmit && (
            <Alert sx={{ p: 5 }} severity="success">
              {successSubmit}
            </Alert>
          )}
        </Stack>
      </form>
    </>
  );
}

export default RecoverPasswordForm;
