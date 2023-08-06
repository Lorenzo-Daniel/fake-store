import { Button, Container, Divider, Typography } from "@mui/material";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Form from "../../../Components/FormGroup";

import {
  selectProductsCartList,
  setPurchaseOrder,
} from "../../../Reducers/cartSlice";

import { onSubmitFormValidtionHelper } from "../../../helpers/formHelpers";

function ShippingServiceForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsCartList = useSelector(selectProductsCartList);
  const [formValues, setFormValues] = useState({
    address: "",
    city: "",
    postalCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  const inputsData = [
    {
      type: "text",
      name: "address",
      label: "Address",
      autoComplete: "off",
    },
    {
      type: "text",
      name: "postalCode",
      label: "Postal code",
      autoComplete: "off",
    },
    {
      type: "text",
      name: "city",
      label: "City",
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
    } else {
      const totalPrice = productsCartList.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      const orderNumber = (Math.random() * (1000 * 1000000)).toFixed();

      dispatch(
        setPurchaseOrder({
          formValues,
          productsCartList,
          totalPrice,
          orderNumber,
        })
      );
      navigate("/purchase-summary");
    }
  };

  const buttonSubmit = (
    <Button fullWidth size="large" type="submit" variant="outlined">
      continue
    </Button>
  );
  return (
    <>
      <Typography variant="h4" my={4}>
        Shipping data
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
    </>
  );
}

export default ShippingServiceForm;
