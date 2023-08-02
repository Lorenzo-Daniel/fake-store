// import React, { useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button,Divider } from "@mui/material";


function PayementMethods() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" my={4}>
        Payement Methods
      </Typography>
      <Divider/>
      <Grid container spacing={2} mt={5}>
        <Grid item xs={12} lg={8}>
          <Button
            sx={{
              width: "100%",
              padding: "35px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#e8f4ff7d",
              color: "#545050",
              alignItems: "center",
            }}
            onClick={() => {
             navigate('/shipping-service')
            }}
          >
            <Box>
              <AttachMoneyIcon />
              <Typography variant="span" mt={4}>
                Cash
              </Typography>
            </Box>
            <AccountBalanceIcon />
          </Button>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Button
            sx={{
              width: "100%",
              padding: "35px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#e8f4ff7d",
              color: "#545050",
              alignItems: "center",
            }}
            onClick={() => {
             navigate('/credit-card-form')
            }}
          >
            <Box>
              <CreditCardIcon />
              <Typography variant="span" mt={4} ml={1}>
                Credit Card
              </Typography>
            </Box>
            <AccountBalanceIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PayementMethods;
