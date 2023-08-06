import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from "../../../Components/FormGroup";
import { onSubmitFormValidtionHelper } from "../../../helpers/formHelpers";
function CreditCardForm() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    creditCardNumber: "",
    firstName: "",
    lastName: "",
    creditCardExpirationDate: "",
    creditCardSecurityCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    creditCardNumber: "",
    crediCardSecurityCode: "",
    creditCardExpirationDate: "",
  });

  const formData = {
    setFormValues: setFormValues,
    setFormErrors: setFormErrors,
    formValues: formValues,
    formErrors: formErrors,
  };
  const inputsData = [
    {
      type: "text",
      name: "firstName",
      label: "First name",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name",
    },
    {
      type: "password",
      name: "creditCardNumber",
      label: "Credit Card number",
    },
    {
      type: "password",
      name: "creditCardSecurityCode",
      label: "Credit Card security code",
    },
    {
      type: "date",
      name: "creditCardExpirationDate",
    },
  ];

  const onSubmitHandler = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValues,
      formErrors
    );

    if (hasErrors) {
      console.error("Something went wrong, try again.");
      setFormErrors(updatedFormErrors);
      return;
    } else {
      navigate("/shipping-service");
    }
  };

  const buttonSubmit = (
    <Button
      fullWidth
      size="large"
      type="submit"
      variant="outlined"
      sx={{ mt: 4 }}
    >
      Continue
    </Button>
  );
  return (
    <Box>
      <Typography variant="h4" my={4}>
        Credit Card
      </Typography>
      <Divider />
      <Container sx={{ mt: 5 }}>
        <Form
          formData={formData}
          inputsData={inputsData}
          onSubmit={onSubmitHandler}
          children={buttonSubmit}
        />
      </Container>
    </Box>
  );
}

export default CreditCardForm;
