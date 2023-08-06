import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TemporaryDrawer from "./TemporaryDrawer";

import {
  removeAllProductFromCart,
  removePurchaseOrder,
  selectProductsCartList,
  selectPurchaseOrder,
  selectTotalCount,
} from "../Reducers/cartSlice";

import {
  logout,
  selectUser,
  selectUserIsLogeedIn,
} from "../Reducers/userSlice";

import {
  documentIsCharged,
  removeAllProductFromSavedCart,
} from "../Reducers/savedCartSlice";


import { getAuth, signOut } from "firebase/auth";
import { checkAndHandleCartDocument } from "../helpers/firebaseHelpers/firestoreHelpers";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { AccountCircle, ShoppingCartSharp } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PopUpModal from "./popUpModal/PopUpModal";


//-----------------------------------------------------------------------

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const totalCount = useSelector(selectTotalCount);
  const userData = useSelector(selectUser);
  const productsCartList = useSelector(selectProductsCartList);
  const userIsLogged = useSelector(selectUserIsLogeedIn);
  const purchseOrder = useSelector(selectPurchaseOrder);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const db = getFirestore();
  const [messagesCount, setMessageCount] = useState(0);
  const [messageRead, setMessageRead] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const CategoryRequest = async () => {
    let res;
    if (localStorage.getItem("categoriesList")) {
      res = JSON.parse(localStorage.getItem("categoriesList"));
    } else {
      const request = await fetch(`https://dummyjson.com/products/categories`);
      res = await request.json();
      localStorage.setItem("categoriesList", JSON.stringify(res));
    }
    return res;
  };

  const handleLogout = () => {
    if (purchseOrder && !confirmLogout) {
      setShowModal(true);
      return;
    } else {
      signOut(auth)
        .then(() => {
          checkAndHandleCartDocument(
            userData?.uid,
            totalCount,
            productsCartList,
            userData
          );
          navigate("/");
          dispatch(removeAllProductFromCart());
          dispatch(removeAllProductFromSavedCart());
          dispatch(documentIsCharged(false));
          dispatch(removePurchaseOrder());
          dispatch(logout());
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error(errorMessage);
        });
    }
  };

  const handleMessages = () => {
    navigate("/user-messages");
    setMessageRead(true);
  };

  const checkIfDocumentExists = async (auth) => {
    if (!auth.currentUser) {
      return;
    }
    try {
      if (messageRead) {
        setMessageCount(0);
      }
      const user = auth.currentUser;
      const userDoc = await getDoc(doc(db, "cartProducts", user.uid));
      if (userDoc.exists()) {
        if (userDoc.data().cart.totalCount > 0) {
          setMessageCount(2);
        } else {
          setMessageCount(1);
        }
      }
    } catch (error) {
      console.error("Error al verificar el documento:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await CategoryRequest();
        setAllCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    checkIfDocumentExists(auth);
    // eslint-disable-next-line
  }, [auth, messagesCount]);

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
          <MenuItem divider onClick={handleMessages}>
            Notifications
            <Badge
              badgeContent={messagesCount}
              color="error"
              sx={{ mb: 3, ml: 1 }}
            ></Badge>
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
      {showModal && (
        <PopUpModal
          setConfirmLogout={setConfirmLogout}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
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
              onClick={handleMessages}
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
