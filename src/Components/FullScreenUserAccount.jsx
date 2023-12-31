import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  selectUser,
  selectUserExtendedData,
  setUserExtendedData,
} from "../Reducers/userSlice";

import {
  deleteAccount,
  updateUserEmail,
} from "../helpers/firebaseHelpers/authHelpers";

import {
  getUserIdDocument,
  updateUserPhone,
} from "../helpers/firebaseHelpers/firestoreHelpers";

//--------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//-------------------------------------------------------------------

function FullScreenUserAccount({ userAccountOpen, setUserAccountOpen }) {
  const [open, setOpen] = useState(false);
  const [userExtendedData, setUserExtenderData] = useState(null);
  const [alertChanges, setAlertChanges] = useState(false);
  const [alertToShow, setAlertToShow] = useState();
  const [succesChanges, setSuccesChange] = useState(false);
  const [errorChanges, setErrorChanges] = useState(false);
  const alertBox = useRef(null);

  const userId = useSelector(selectUser)?.uid;
  const getExtendedDataStorage = useSelector(selectUserExtendedData);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();

  const handleAlertModificationAccount = (name) => {
    setAlertChanges(true);
    console.log(name);
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
      setErrorChanges(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setUserAccountOpen(false);
  };

  useEffect(() => {
    setOpen(userAccountOpen);
    if (!getExtendedDataStorage) {
      if (userId) {
        getUserIdDocument(userId, setUserExtenderData);
        dispatch(setUserExtendedData(userExtendedData));
      }
    }
    document.addEventListener("mousedown", handleClickOutSideBoxAlert);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSideBoxAlert);
    };
    // eslint-disable-next-line
  }, [userAccountOpen]);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#212529" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              My Account
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box sx={{ maxWidth: "300px" }} ref={alertBox}>
          <List>
            <ListItem>
              <Typography variant="h6">User Data</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Fisrta name"
                secondary={getExtendedDataStorage?.firstName}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Last name"
                secondary={getExtendedDataStorage?.lastName}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Phone Number"
                secondary={getExtendedDataStorage?.phone}
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
                secondary={getExtendedDataStorage?.email}
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
            <Divider />
            <ListItem>
              <Button
                sx={{ p: 1 }}
                size="small"
                aria-label="delete"
                color="error"
                onClick={() => handleAlertModificationAccount("deleteAccount")}
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
                    onClick={() =>
                      deleteAccount(
                        dispatch,
                        setAlertToShow,
                        setAlertChanges,
                        setSuccesChange,
                        setErrorChanges,
                        auth,
                        db
                      )
                    }
                  >
                    <Typography variant="subtitle" fontSize={"10px"}>
                      delete account
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
              {alertToShow.changeEmail && (
                <form
                  onSubmit={(e) =>
                    updateUserEmail(
                      e,
                      auth,
                      newEmail,
                      setAlertToShow,
                      setAlertChanges,
                      setSuccesChange,
                      setErrorChanges,
                      db,
                      newEmail,
                      "email",
                      "users",
                      "cartProducts"
                    )
                  }
                >
                  <TextField
                    sx={{ mt: 1 }}
                    placeholder="Enter your new email "
                    onChange={(e) => setNewEmail(e.target.value)}
                  />

                  <Button
                    sx={{ p: 1 }}
                    size="small"
                    type="submit"
                    color="warning"
                  >
                    <Typography variant="subtitle" fontSize={"10px"}>
                      update
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
                </form>
              )}
              {alertToShow.changePhone && (
                <Box>
                  <TextField
                    sx={{ mt: 1 }}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Enter your new number"
                  />
                  <Button
                    sx={{ p: 1 }}
                    size="small"
                    color="warning"
                    onClick={() =>
                      updateUserPhone(
                        db,
                        userId,
                        "users",
                        "phone",
                        newPhone,
                        setAlertToShow,
                        setAlertChanges,
                        setSuccesChange,
                        setErrorChanges
                      )
                    }
                  >
                    <Typography variant="subtitle" fontSize={"10px"}>
                      update
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
            </Alert>
          )}
          <Box ref={alertBox}>
            {succesChanges && (
              <Alert sx={{ p: 4 }} severity="success">
                {succesChanges}
              </Alert>
            )}
            {errorChanges && (
              <Alert sx={{ p: 4 }} severity="error">
                {errorChanges}
              </Alert>
            )}
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default FullScreenUserAccount;
