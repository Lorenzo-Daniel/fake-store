import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputForm from "../../../Components/Form Componenets/InputForm";
import { onSubmitFormValidtionHelper } from "../../../helpers/formHelpers";
import { useNavigate } from "react-router";

function CreditCardForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    creditCardNumber: "",
    firstName: "",
    lastName: "",
    creditCardExpirationDate: "",
    crediCardSecurityCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    creditCardNumber: "",
    firstName: "",
    lastName: "",
    creditCardExpirationDate: "",
    crediCardSecurityCode: "",
  });

  const handleSubmit = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValues,
      formErrors
    );

    if (hasErrors) {
      console.error("Something went wrong, try again.");
      setError(true);
      setFormErrors(updatedFormErrors);
      setErrorSubmit("All fields are required");
      return;
    } else {
      navigate("/mailing");
    }
  };

  return (
    <Box>
      <Typography variant="h4" mt={4}>
        Credit Card
      </Typography>

      <Container sx={{ mt: 5 }}>
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
              name="firstName"
              label="First name"
              autoComplete="user-crdit-card-name"
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
              autoComplete="user-credit-card-lastName"
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
              name="creditCardNumber"
              label={"Credit card number"}
              autoComplete="user-creditCardNumber"
            />
            <InputForm
              type={"date"}
              formValues={formValues}
              setFormValues={setFormValues}
              setFormErrors={setFormErrors}
              setError={setError}
              formErrors={formErrors}
              error={error}
              setErrorSubmit={setErrorSubmit}
              name="creditCardExpirationDate"
              autoComplete="user-creditCardExpirationDate"
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
              name="crediCardSecurityCode"
              label="Security code"
              autoComplete="user-crediCardSecurityCode"
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="outlined"
              sx={{ mt: 4 }}
            >
              Continue
            </Button>
            {errorSubmit && (
              <Alert sx={{ p: 5 }} severity="error">
                {errorSubmit}
              </Alert>
            )}
          </Stack>
        </form>
      </Container>
    </Box>
  );
}

export default CreditCardForm;
