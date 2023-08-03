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
//-----------------------------------------------------------
import React, { forwardRef, useEffect, useRef, useState } from "react";
//-----------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
//------------------------------------------------------------
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//------------------------------------------------------------
import {
  selectUser,
  selectUserExtendedData,
  setUserExtendedData,
} from "../../Reducers/userSlice";
//--------------------------------------------------------------

import {
  deleteAccount,
  updateUserEmail,
} from "../../helpers/firebaseHelpers/authHelpers";
import {
  getUserIdDocument,
  updateUserPhone,
} from "../../helpers/firebaseHelpers/firestoreHelpers";
//--------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//-------------------------------------------------------------------
function UserAccount() {
  const [open, setOpen] = useState(true);
  const [alertChanges, setAlertChanges] = useState(false);
  const [alertToShow, setAlertToShow] = useState();
  const [successChanges, setSuccesChange] = useState(false);
  const [errorChanges, setErrorChanges] = useState('');
  const alertBox = useRef(null);
  const userId = useSelector(selectUser)?.uid;
  const userExtendedData = useSelector(selectUserExtendedData);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

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
    navigate(-1);
  };

  useEffect(() => {
    if (!userExtendedData) {
      if (userId) {
        getUserIdDocument(auth,db, dispatch,setUserExtendedData);
      }
    }
    document.addEventListener("mousedown", handleClickOutSideBoxAlert);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSideBoxAlert);
    };
    // eslint-disable-next-line
  }, [userExtendedData]);
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
            {successChanges && (
              <Alert sx={{ p: 4 }} severity="success">
                {successChanges}
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

export default UserAccount;
