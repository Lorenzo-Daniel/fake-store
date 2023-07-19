import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TemporaryDrawer from "./TemporaryDrawer";
import FullScreenUserMessage from "./FullScreenUserMessage";
import FullScreenUserAccount from "./FullScreenUserAccount";


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
  const [userMessageOpen,setUserMessageOpen] = useState(false)
  const totalCount = useSelector(selectTotalCount);
  const userData = useSelector(selectUser);
  const productsCartList = useSelector(selectProductsCartList);
  const userIsLogged = useSelector(selectUserIsLogeedIn);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[userAccountOpen, setUserAccountOpen] = useState(false)


  const CategoryRequest = async () => {
    try {
      const request = await fetch(`https://dummyjson.com/products/categories`);
      const res = await request.json();
      localStorage.setItem("categoriesList", JSON.stringify(res));
    } catch (error) {
      throw new Error(`Something went wrong | Error : ${error}`);
    }
  };
console.log(userMessageOpen);
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
        dispatch(logout());
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    setAllCategories(
      JSON.parse(localStorage.getItem("categoriesList")) || CategoryRequest()
    );
  }, []);

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
          <MenuItem divider onClick={()=>setUserAccountOpen(true)}>
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
      <MenuItem divider>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          color={userIsLogged ? "primary" : "inherit"}
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={()=>setUserMessageOpen(true)}
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
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
              onClick={() => navigate("/")}
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
              onClick={()=>setUserMessageOpen(true)}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ display: { xs: "none", md: "flex" } }}
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color={userIsLogged ? "primary" : "inherit" }
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
      <FullScreenUserMessage userMessageOpen={userMessageOpen} setUserMessageOpen = {setUserMessageOpen}/>
      <FullScreenUserAccount userAccountOpen={userAccountOpen} setUserAccountOpen = {setUserAccountOpen}/>
    </Box>
  );
}
export default Navbar;
