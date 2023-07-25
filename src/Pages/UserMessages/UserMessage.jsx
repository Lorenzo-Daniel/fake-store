import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

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
  
  return <Slide  direction="up" ref={ref} {...props} />;
});

function UserMessage() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
 

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 200);
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

export default UserMessage;
