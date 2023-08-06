import CloseIcon from "@mui/icons-material/Close";

import {
  AppBar,
  Box,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";

import { getAuth } from "firebase/auth";

import { doc, getDoc, getFirestore } from "firebase/firestore";

import React, { forwardRef, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//--------------------------------------------------------------------

function UserMessage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [open, setOpen] = useState(true);
  const [productsInCart, setProductsInCart] = useState(null);

  const checkIfDocumentExists = async () => {
    if (!auth.currentUser) {
      return;
    }
    try {
      const userId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, "cartProducts", userId));
      if (userDoc.exists()) {
        if (userDoc.data().cart.totalCount > 0) {
          setProductsInCart({
            title: "Finish your purchase!",
            text: "In your last session, you left products in your cart! Watch your saved products!",
          });
        }
      }
    } catch (error) {
      console.error("Error al verificar el documento:", error);
    }
  };

  useEffect(() => {
    checkIfDocumentExists();
     // eslint-disable-next-line 
  }, [auth,]);

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
            {productsInCart && (
              <ListItem button>
                <ListItemText
                  primary={productsInCart.title}
                  secondary={productsInCart.text}
                  onClick={()=>navigate('/cart')}
                />
              </ListItem>
            )}
            <Divider />
            <ListItem button    >
              <ListItemText
                primary="Welcome to Fake Store!"
              />
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </div>
  );
}

export default UserMessage;
