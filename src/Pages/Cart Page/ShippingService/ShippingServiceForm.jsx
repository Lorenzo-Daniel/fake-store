import {
  Alert,
  Divider,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputForm from "../../../Components/Form Componenets/InputForm";
import { onSubmitFormValidtionHelper } from "../../../helpers/formHelpers";
import { useNavigate } from "react-router";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { checkAndHandlePurchaseOrderDocument } from "../../../helpers/firebaseHelpers/firestoreHelpers";
import { selectProductsCartList ,setPurchaseOrder} from "../../../Reducers/cartSlice";
import { useDispatch ,useSelector} from "react-redux";


function ShippingServiceForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = getAuth().currentUser;
  const db = getFirestore();
  const cartList = useSelector(selectProductsCartList);
  const [error, setError] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    address: "",
    city: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({
    address: "",
    city: "",
    name: "",
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
      checkAndHandlePurchaseOrderDocument(formValues, user, db, cartList,setPurchaseOrder,dispatch);

      navigate("/purchase-summary");
    }
  };

  return (
    <>
      <Typography variant="h4" my={4}>
        Shipping data
      </Typography>

      <Divider />
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
              name="address"
              label="Address"
              autoComplete="off"
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
              name="city"
              label={"City"}
              autoComplete="user-city"
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
              name="name"
              label="Name"
              autoComplete="user-name"
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
    </>
  );
}

export default ShippingServiceForm;
