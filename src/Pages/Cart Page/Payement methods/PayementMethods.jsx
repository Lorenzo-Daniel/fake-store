// import React, { useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import { Link } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
function PayementMethods() {
  return (
    <Box>
      <Typography variant="h4" mt={4}>
        Payement Methods
      </Typography>
      <Grid container spacing={5} mt={5}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ p: 5, display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <AttachMoneyIcon />
              <Typography variant="span" mt={4}>
                Pay Cash
              </Typography>
            </Box>
            <AccountBalanceIcon />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ p: 5, display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <CreditCardIcon />
              <Typography variant="span" mt={4} ml={1}>
                Pay with Credit Card
              </Typography>
            </Box>
            <AccountBalanceIcon />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PayementMethods;
