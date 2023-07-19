import React, { useState, forwardRef, useEffect } from "react";

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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenUserAccount({ userAccountOpen, setUserAccountOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(userAccountOpen);
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
              Message box
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Discount!!" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </div>
  );
}

export default FullScreenUserAccount;
