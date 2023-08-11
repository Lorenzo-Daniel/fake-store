import {
  Alert,
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeAllProductFromCart,
  removePurchaseOrder,
  selectPurchaseOrder,
  setPurchaseOrder,
} from "../../../Reducers/cartSlice";

import {
  selectUserExtendedData,
  setUserExtendedData,
} from "../../../Reducers/userSlice";

import {
  checkAndHandlePurchaseOrderDocument,
  getUserIdDocument,
} from "../../../helpers/firebaseHelpers/firestoreHelpers";

import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router";

//----------------------------------------------------------------------------------------

function PurchaseSummary() {
  const purchaseOrder = useSelector(selectPurchaseOrder);
  const userExtendedData = useSelector(selectUserExtendedData);
  const auth = getAuth();
  const db = getFirestore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePurchaseFinish = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    checkAndHandlePurchaseOrderDocument(auth?.currentUser, db, purchaseOrder);
    dispatch(
      setPurchaseOrder({
        orderNumber: purchaseOrder?.orderNumber,
        deliveryDate: deliveryDate.toDateString(),
      })
    );
    dispatch(removeAllProductFromCart());
  };

  useEffect(() => {
    if (!userExtendedData) {
      getUserIdDocument(auth, db, dispatch, setUserExtendedData);
    }
    // eslint-disable-next-line
  }, [userExtendedData]);
  return (
    <>
      {purchaseOrder?.formValues ? (
        <Container >
          <Box display={"flex"} flexDirection={"column"} >
            <Box sx={{ padding: "15px" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                aria-label="contacts"
              >
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${userExtendedData?.firstName} ${userExtendedData?.lastName} `}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <MailOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={userExtendedData?.email} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PhoneAndroidIcon />
                  </ListItemIcon>
                  <ListItemText primary={userExtendedData?.phone} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LocalShippingIcon />
                  </ListItemIcon>
                  <ListItemText primary={purchaseOrder?.formValues.address} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`P.C: ${purchaseOrder?.formValues.postalCode}`}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText primary={purchaseOrder?.formValues.city} />
                </ListItem>
              </List>
            </Box>
            <Divider/>
            <Box sx={{ padding: "15px" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {purchaseOrder?.productsCartList.map((product) => {
                  return (
                    <ListItem disablePadding key={product.id}>
                      <ListItemIcon>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          width={30}
                          height={30}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={product.title}
                        secondary={`$ ${product.price} Qty. ${product.quantity}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Divider sx={{my:2}}/>
              <Box display={"flex"} justifyContent={'end'} mt={2}>

              <Typography>
                Total Price : $ {purchaseOrder?.totalPrice}
              </Typography>
              </Box>
            </Box>
            <Box display={"flex"} padding={2} maxWidth={"300px"}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handlePurchaseFinish()}
              >
                Finish
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Alert
          severity="success"
          sx={{ lineHeight: "25px", letterSpacing: "1px" }}
        >
          your purchase has been completed successfully!!
          <br /> Your purchase order number is:
          <Typography variant="span" color={"primary"} ml={1}>
            {purchaseOrder?.orderNumber}
          </Typography>
          <br />
          The merchandise will be delivered on
          <Typography variant="span" color={"primary"} ml={1}>
            {purchaseOrder?.deliveryDate}
          </Typography>
            , between 9:00 a.m. and 2:00 p.m. Thank
          you for choosing us!!
          <Button
            variant="text"
            onClick={() => {
              dispatch(removePurchaseOrder());
              navigate("/store/all products");
            }}
          >
            Back to store
          </Button>
        </Alert>
      )}
    </>
  );
}

export default PurchaseSummary;
