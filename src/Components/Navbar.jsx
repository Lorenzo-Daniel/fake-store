import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TemporaryDrawer from "./TemporaryDrawer";
import {getDoc,doc,getFirestore} from 'firebase/firestore'

import {
  selectUserIsLogeedIn,
  logout,
  selectUser,
} from "../Reducers/userSlice";
import {
  selectTotalCount,
  removeAllProductFromCart,
  selectProductsCartList,
} from "../Reducers/cartSlice";

import {
  removeAllProductFromSavedCart,
  documentIsCharged,
} from "../Reducers/savedCartSlice";

import { checkAndHandleCartDocument } from "../helpers/firebaseHelpers/firestoreHelpers";
//----------------------------------------------------------------------------

import { getAuth, signOut } from "firebase/auth";

//-------------------------------------------------------------------
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Button,
  Menu,
} from "@mui/material";
//--------------------------------------------------------------------
import { ShoppingCartSharp, AccountCircle } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

//-----------------------------------------------------------------------

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const totalCount = useSelector(selectTotalCount);
  const userData = useSelector(selectUser);
  const productsCartList = useSelector(selectProductsCartList);
  const userIsLogged = useSelector(selectUserIsLogeedIn);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const db = getFirestore()
  const [messagesCount,setMessageCount]= useState(1)

  const CategoryRequest = async () => {
    try {
      const request = await fetch(`https://dummyjson.com/products/categories`);
      const res = await request.json();
      localStorage.setItem("categoriesList", JSON.stringify(res));
    } catch (error) {
      throw new Error(`Something went wrong | Error : ${error}`);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        checkAndHandleCartDocument(
          userData?.uid,
          totalCount,
          productsCartList,
          userData
        );
        dispatch(removeAllProductFromCart());
        dispatch(removeAllProductFromSavedCart());
        dispatch(documentIsCharged(false));
        dispatch(logout());
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const checkIfDocumentExists = async (auth) => {
    if (!auth.currentUser) {
      return; 
    }
  
    try {
      const userId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, "cartProducts", userId));
      if (userDoc.exists()) {
        if(userDoc.data().cart.totalCount > 0){
          setMessageCount(2)
        }
      }else {
        setMessageCount(1)
        console.log(userDoc.length);
      }
    } catch (error) {
      console.error("Error al verificar el documento:", error);
    }
  };

  useEffect(() => {
    setAllCategories(
      JSON.parse(localStorage.getItem("categoriesList")) || CategoryRequest()
    );
    checkIfDocumentExists(auth)
    // eslint-disable-next-line 
  }, [auth,messagesCount]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userIsLogged ? (
        <div>
          <MenuItem divider>{userData.email}</MenuItem>
          <MenuItem divider onClick={() => navigate("/user-account")}>
            My account
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem divider>You are not logged in </MenuItem>
          <MenuItem onClick={() => navigate("/loginPage")}>Login</MenuItem>
          <MenuItem onClick={() => navigate("/SignUp")}>Register</MenuItem>
        </div>
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userIsLogged ? (
        <div>
          <MenuItem divider>{userData.email}</MenuItem>

          <MenuItem divider onClick={() => navigate("/user-account")}>
            My account
          </MenuItem>
          <MenuItem divider onClick={() => navigate("/user-messages")}>
            Notifications
            <Badge badgeContent={messagesCount} color="error" sx={{ mb: 3, ml: 1 }}></Badge>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem divider>You are not logged in </MenuItem>
          <MenuItem onClick={() => navigate("/loginPage")}>Login</MenuItem>
          <MenuItem onClick={() => navigate("/SignUp")}>Register</MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-dark">
          <TemporaryDrawer allCategories={allCategories} />
          <Button color={"inherit"}>
            <Typography
              variant="h6"
              className="bg-dark border-0"
              noWrap
              sx={{ display: { sm: "block" } }}
              onClick={() => navigate("/store/all products")}
            >
              Fake Store
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              onClick={() => navigate("/cart")}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={totalCount} color="error">
                <ShoppingCartSharp />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ display: { xs: "none", md: "flex" } }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => navigate("/user-messages")}
            >
              <Badge badgeContent={messagesCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ display: { xs: "none", md: "flex" } }}
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color={userIsLogged ? "primary" : "inherit"}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default Navbar;
