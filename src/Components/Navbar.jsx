// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { faClose } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate,Link} from "react-router-dom";
// import { useSelector} from "react-redux";

// function Navbar() {
//   const [allCategories, setAllCategories] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const ref = useRef(null);
//   const navigate = useNavigate();
//   const cart = useSelector(state => state.cart);
//   const CategoryRequest = async () => {
//     try {
//       const request = await fetch(`https://dummyjson.com/products/categories`);
//       const res = await request.json();
//       localStorage.setItem("categoriesList", JSON.stringify(res));
//     } catch (error) {
//       throw new Error(`Something went wrong | Error : ${error}`);
//     }
//   };

//   const onclickOutSideHandle = (event) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {

//     setAllCategories(
//       JSON.parse(localStorage.getItem("categoriesList"))
//       || CategoryRequest()
//     );
//     document.addEventListener("mousedown", onclickOutSideHandle);
//     return () => {
//       document.removeEventListener("mousedown", onclickOutSideHandle);
//     };
//     // ;
//   }, []);

//   const back = () => {
//     navigate("/");
//   };
//   return (
//     <header className=" shadow p-2 sticky-top bg-white  ">
//       <nav className="navbar-store ">
//         <FontAwesomeIcon
//           icon={faBars}
//           className="burger-icon "
//           onClick={() => setIsOpen((prev) => !prev)}
//         />
//         <div>
//           <h1 className="text-center" onClick={() => back()}>
//             Fake Store
//           </h1>
//         </div>
//         <div className="navbar-cart-icon">
//           <Link to={'/cart'} type="button" className="btn position-relative">
//           <FontAwesomeIcon icon={faCartShopping}  className="fs-2"/>
//             <span className="position-absolute   start-100 translate-middle badge  bg-danger">
//              {cart.totalCount}
//               <span className="visually-hidden">unread messages</span>
//             </span>
//           </Link>
//         </div>
//       </nav>
//       {isOpen && (
//         <div className="menu" ref={ref}>
//           <div className="d-flex justify-content-end ">
//             <FontAwesomeIcon
//               icon={faClose}
//               className="fs-4 m-1"
//               onClick={() => setIsOpen((prev) => !prev)}
//             />
//           </div>
//           <div className="d-flex flex-column align-items-start">
//             {allCategories.map((category) => {
//               return (
//                 <input
//                   key={category}
//                   type="button"
//                   value={category.toUpperCase()}
//                   className="btn"
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ShoppingCartSharp } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import TemporaryDrawer from "./TemporaryDrawer";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const CategoryRequest = async () => {
    try {
      const request = await fetch(`https://dummyjson.com/products/categories`);
      const res = await request.json();
      localStorage.setItem("categoriesList", JSON.stringify(res));
    } catch (error) {
      throw new Error(`Something went wrong | Error : ${error}`);
    }
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
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
            <Typography
              variant="h6"
              className="bg-dark border-0"
              color={'inherit'}
              noWrap
              sx={{ display: { sm: "block" } }}
              onClick={()=>navigate('/')}
            >
              Fake Store
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge
                badgeContent={cart.totalCount}
                color="error"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartSharp />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ display: { xs: "none", md: "flex" } }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ display: { xs: "none", md: "flex" } }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
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
