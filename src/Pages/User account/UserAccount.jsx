import { CalendarToday, ExpandMore } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  selectHistoryOrders,
  selectUser,
  selectUserExtendedData,
  setHistoryOrders,
  setUserExtendedData,
} from "../../Reducers/userSlice";

import Form from "../../Components/FormGroup";

import {
  deleteAccount,
  updateUserEmail,
} from "../../helpers/firebaseHelpers/authHelpers";

import {
  getUserIdDocument,
  getUserIdPurchaseDocument,
  updateValueInObjectDoc,
} from "../../helpers/firebaseHelpers/firestoreHelpers";

import { onSubmitFormValidtionHelper } from "../../helpers/formHelpers";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//-------------------------------------------------------------------

function UserAccount() {
  const alertBox = useRef(null);
  const db = getFirestore();
  const auth = getAuth();
  const userId = useSelector(selectUser)?.uid;
  const userExtendedData = useSelector(selectUserExtendedData);
  const historyOrders = useSelector(selectHistoryOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [alertChanges, setAlertChanges] = useState(false);
  const [alertToShow, setAlertToShow] = useState();
  const [showOrders, setShowOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onErrorSubmit, setOnErrorSubmit] = useState(false);
  const [formValuesEmail, setFormValuesEmail] = useState({ email: "" });
  const [formErrorsEmail, setFormErrorsEmail] = useState({ email: "" });
  const [formValuesPhone, setFormValuesPhone] = useState({ phone: "" });
  const [formErrorsPhone, setFormErrorsPhone] = useState({ phone: "" });
  const [onSuccessSumbit, setOnSuccessSumbit] = useState("");

  const formDataPhone = {
    setFormValues: setFormValuesPhone,
    setFormErrors: setFormErrorsPhone,
    formValues: formValuesPhone,
    formErrors: formErrorsPhone,
  };

  const inputsDataPhone = [
    {
      type: "text",
      name: "phone",
      label: "Enter you new Phone number",
    },
  ];

  const formDataEmail = {
    setFormValues: setFormValuesEmail,
    setFormErrors: setFormErrorsEmail,
    formValues: formValuesEmail,
    formErrors: formErrorsEmail,
  };

  const inputsDataEmail = [
    {
      type: "text",
      name: "email",
      label: "Enter you new email",
    },
  ];

  const handleAlertModificationAccount = (name) => {
    setAlertChanges(true);
    setOnErrorSubmit(false);
    setOnSuccessSumbit(false);
    switch (name) {
      case "changeEmail":
        setAlertToShow({
          text: "Are you sure you want to update your email address ? ",
          changeEmail: true,
        });
        break;
      case "deleteAccount":
        setAlertToShow({
          text: "Are you sure you want to delete your account? All your data will be permanently deleted",
          deleteAccount: true,
        });
        break;
      case "phone":
        setAlertToShow({
          text: "Are you sure you want to update your phone number?",
          changePhone: true,
        });
        break;
      default:
        break;
    }
  };

  const handleClickOutSideBoxAlert = (event) => {
    if (alertBox.current && !alertBox.current.contains(event.target)) {
      setAlertChanges(false);
      setOnErrorSubmit(false);
      setOnSuccessSumbit(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    if (!userExtendedData) {
      if (userId) {
        getUserIdDocument(auth, db, dispatch, setUserExtendedData);
        getUserIdPurchaseDocument(auth, db, dispatch, setHistoryOrders);
      }
    }
    document.addEventListener("mousedown", handleClickOutSideBoxAlert);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSideBoxAlert);
    };
    // eslint-disable-next-line
  }, [userExtendedData]);

  const onSubmitHandlerPhone = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValuesPhone,
      formErrorsPhone
    );

    if (hasErrors) {
      setFormErrorsPhone(updatedFormErrors);
      return;
    }
    updateValueInObjectDoc(
      db,
      userId,
      "users",
      "phone",
      formValuesPhone.phone,
      setOnErrorSubmit,
      setOnSuccessSumbit,
      setIsLoading
    )
      .then(() => {
        setAlertToShow(false);
        setAlertChanges(false);
      })
      .catch((error) => {
        setOnErrorSubmit("something went wrong ,try again");
        console.error("Error al actualizar phone en objeto: ", error);
      });
  };

  const onSubmitHandlerEmail = (e) => {
    const { updatedFormErrors, hasErrors } = onSubmitFormValidtionHelper(
      e,
      formValuesEmail,
      formErrorsEmail
    );

    if (hasErrors) {
      setFormErrorsEmail(updatedFormErrors);
      return;
    }
    updateUserEmail(
      db,
      auth,
      formValuesEmail.email,
      "email",
      setOnSuccessSumbit,
      setOnErrorSubmit,
      setIsLoading,
      "users",
      "cartProducts"
    )
      .then(() => {
        setAlertToShow(false);
        setAlertChanges(false);
      })
      .catch((error) => {
        setAlertToShow(false);
        setAlertChanges(false);
        setOnErrorSubmit("something went wrong ,try again");
        console.error("Error al actualizar phone en objeto: ", error);
      });
  };
  const buttonsGroup = (
    <Box>
      <Button
        sx={{ p: 1 }}
        size="small"
        color="warning"
        disabled={isLoading ? true : false}
        type="submit"
      >
        <Typography variant="subtitle" fontSize={"10px"}>
          {isLoading ? "updating... " : "update"}
        </Typography>
      </Button>

      <Button
        sx={{ p: 1 }}
        size="small"
        color="warning"
        onClick={() => setAlertChanges(false)}
      >
        <Typography variant="subtitle" fontSize={"10px"}>
          close
        </Typography>
      </Button>
    </Box>
  );

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#212529" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              My Account
            </Typography>
          </Toolbar>
        </AppBar>
        {!showOrders ? (
          <Box sx={{ maxWidth: "300px" }} ref={alertBox}>
            <List>
              <ListItem>
                <Typography variant="h6">User Data</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="First name"
                  secondary={userExtendedData?.firstName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last name"
                  secondary={userExtendedData?.lastName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Phone Number"
                  secondary={userExtendedData?.phone}
                />
                <Button
                  sx={{ p: 1 }}
                  size="small"
                  color="error"
                  onClick={() => handleAlertModificationAccount("phone")}
                >
                  <Typography variant="subtitle" fontSize={"10px"}>
                    update
                  </Typography>
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email Address"
                  secondary={userExtendedData?.email}
                />
                <Button
                  sx={{ p: 1 }}
                  size="small"
                  color="error"
                  onClick={() => handleAlertModificationAccount("changeEmail")}
                >
                  <Typography variant="subtitle" fontSize={"10px"}>
                    update
                  </Typography>
                </Button>
              </ListItem>
              <ListItemButton
                disabled={!historyOrders ? true : false}
                onClick={() => setShowOrders(true)}
              >
                <ListItemText
                  primary="My orders"
                  secondary={
                    historyOrders
                      ? "See orders"
                      : "You dont have previous orders"
                  }
                />
              </ListItemButton>

              <Divider />

              <ListItem>
                <Button
                  sx={{ p: 1 }}
                  size="small"
                  aria-label="delete"
                  color="error"
                  onClick={() =>
                    handleAlertModificationAccount("deleteAccount")
                  }
                >
                  <Typography variant="subtitle" fontSize={"12px"}>
                    DELETE ACCOUNT
                  </Typography>
                </Button>
              </ListItem>
            </List>
            {alertChanges && (
              <Alert sx={{ p: 4 }} severity="warning">
                {alertToShow.text}
                {alertToShow.deleteAccount && (
                  <Box>
                    <Button
                      sx={{ p: 1 }}
                      size="small"
                      color="error"
                      disabled={isLoading ? true : false}
                      variant="text"
                      onClick={() =>
                        deleteAccount(
                          auth,
                          db,
                          dispatch,
                          setAlertChanges,
                          setOnSuccessSumbit,
                          setOnErrorSubmit,
                          setIsLoading
                        )
                      }
                    >
                      <Typography variant="subtitle" fontSize={"10px"}>
                        {isLoading ? "deleting account..." : "delete account"}
                      </Typography>
                    </Button>
                    <Button
                      sx={{ p: 1 }}
                      size="small"
                      color="warning"
                      onClick={() => setAlertChanges(false)}
                    >
                      <Typography variant="subtitle" fontSize={"10px"}>
                        close
                      </Typography>
                    </Button>
                  </Box>
                )}
                {alertToShow.changePhone && (
                  <Box mt={2}>
                    <Form
                      formData={formDataPhone}
                      inputsData={inputsDataPhone}
                      onSubmit={onSubmitHandlerPhone}
                      children={buttonsGroup}
                    />
                  </Box>
                )}
                {alertToShow.changeEmail && (
                  <Box mt={2}>
                    <Form
                      formData={formDataEmail}
                      inputsData={inputsDataEmail}
                      onSubmit={onSubmitHandlerEmail}
                      children={buttonsGroup}
                    />
                  </Box>
                )}
              </Alert>
            )}
            <Box ref={alertBox}>
              {onSuccessSumbit && (
                <Alert sx={{ p: 4 }} severity="success">
                  {onSuccessSumbit}
                </Alert>
              )}
              {onErrorSubmit && (
                <Alert sx={{ p: 4 }} severity="error">
                  {onErrorSubmit}
                </Alert>
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Box>
              <List>
                <ListItem>
                  <Typography variant="h6">Your Orders</Typography>
                </ListItem>
                <Divider />
                {historyOrders.orders.map((order, index) => {
                  return (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography sx={{ color: "text.secondary" }}>
                          Order Number: {order.purchaseOrder.orderNumber}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ color: "text.secondary", mb: 1 }}>
                          <CalendarToday sx={{ mr: 2 }} />
                          {order.reference.date}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mb: 1 }}>
                          <LocalShippingIcon sx={{ mr: 2 }} />
                          {order.purchaseOrder.formValues.address}
                        </Typography>
                        <Divider />
                        <Typography sx={{ color: "text.secondary", my: 1 }}>
                          Products:
                        </Typography>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={2}
                        >
                          {order.purchaseOrder.productsCartList.map(
                            (pdt, index) => {
                              return (
                                <Box display={"flex"} key={index}>
                                  <img
                                    src={pdt.thumbnail}
                                    alt={pdt.title}
                                    width={"60px"}
                                    height={"40px"}
                                  />
                                  <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"start"}
                                    ml={2}
                                  >
                                    <Typography variant="span">
                                      {pdt.title}
                                    </Typography>
                                    <Typography variant="span">
                                      ${pdt.price}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            }
                          )}
                          <Typography variant="span">
                            Total Price : $ {order.purchaseOrder.totalPrice}
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </List>
              <Button onClick={() => setShowOrders(false)}>Back</Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}

export default UserAccount;
