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
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={text.slug}
                onClick={() => navigate(`store/${text.slug}`)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
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
