import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//---------------------------------------------------------------------------

function TemporaryDrawer({ allCategories }) {
  const [state, setState] = useState({
    left: false,
  });
  const navigate = useNavigate();

  const anchor = "left";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem className="p-0">
          <ListItemButton>
            <ListItemText
              primary="All Products"
              onClick={() => navigate("/store/all products")}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        {allCategories?.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={text}
                onClick={() => navigate(`store/${text}`)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box>
        <MenuItem sx={{ ml: 0, pl: 0 }}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem sx={{ ml: 0, pl: 0 }}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      </Box>
    </Box>
  );

  return (
    <div>
      <>
        <IconButton className="text-white" onClick={toggleDrawer(anchor, true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </>
    </div>
  );
}

export default TemporaryDrawer;
