import {  Divider, Container, Typography, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  selectPurchaseOrder,
  
} from "../../../Reducers/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserExtendedData,
  setUserExtendedData,
  selectUser,
} from "../../../Reducers/userSlice";
import { getUserIdDocument } from "../../../helpers/firebaseHelpers/firestoreHelpers";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
function PurchaseSummary() {
  const purchaseOrder = useSelector(selectPurchaseOrder);
  const userExtendedData = useSelector(selectUserExtendedData);
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(purchaseOrder);

  useEffect(() => {
    getUserIdDocument(userData.uid, setUserExtendedData);
    dispatch(setUserExtendedData(userExtendedData));
    // eslint-disable-next-line
  }, [userExtendedData,]);
  return (
    <>
      <Typography variant="h4" my={4}>
        Purchase Summary
      </Typography>

      <Divider />
      <Container sx={{ mt: 5 }}>
        <Box display={"flex"} flexDirection={"column"} rowGap={5}>
          <Box
            sx={{
              padding: "15px",
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              aria-label="contacts"
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${userExtendedData.firstName} ${userExtendedData.lastName} `}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <MailOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={userData.email} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary={userExtendedData.phone} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={purchaseOrder.formValues.address} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary={purchaseOrder.formValues.city} />
              </ListItem>
            </List>
          </Box>
          <Box
            sx={{
              padding: "15px",
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              aria-label="contacts"
            >
              {purchaseOrder.productsCartList.map((product) => {
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
            <Typography>
              Total Price : $ {purchaseOrder.totalPrice}
            </Typography>
          </Box>
          <Button variant="outlined">
            Finish
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default PurchaseSummary;
