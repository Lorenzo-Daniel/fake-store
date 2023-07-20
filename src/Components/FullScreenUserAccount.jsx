import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserExtendedData,
  selectUserExtendedData,
  selectUser,
} from "../Reducers/userSlice";
import { getUserIdDocument } from "../helpers/firebaseHelpers/firestoreHelpers";
import {
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenUserAccount({ userAccountOpen, setUserAccountOpen }) {
  const userDataId = useSelector(selectUser)?.uid;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const getExtendedDataStorage = useSelector(selectUserExtendedData);
  const [userExtendedData, setUserExtenderData] = useState(null);

  useEffect(() => {
    setOpen(userAccountOpen);
    getUserIdDocument(userDataId, setUserExtenderData);
    dispatch(setUserExtendedData(userExtendedData));
    // eslint-disable-next-line
  }, [userAccountOpen]);

  const handleClose = () => {
    setOpen(false);
    setUserAccountOpen(false);
  };

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
        <Box sx={{ maxWidth: "300px" }}>
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
              <Button sx={{ p: 1 }} size="small" color="error">
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
              <Button sx={{ p: 1 }} size="small" color="error">
                <Typography variant="subtitle" fontSize={"10px"}>
                  update
                </Typography>
              </Button>
            </ListItem>
            <Divider />
            <ListItem>
              <Button sx={{ p: 1 }} size="small" color="error">
                <Typography variant="subtitle" fontSize={"12px"}>
                  DELETE ACCOUNT
                </Typography>
              </Button>
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </div>
  );
}

export default FullScreenUserAccount;
