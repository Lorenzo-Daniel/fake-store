import "bootstrap/dist/css/bootstrap.css";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { doc, getDoc, getFirestore } from "firebase/firestore";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CartPage from "./Pages/Cart Page/Cart/CartPage";
import CreditCardPage from "./Pages/Cart Page/Cerdit card/CreditCardPage";
import PayementMethodsPage from "./Pages/Cart Page/Payement methods/PayementMethodsPage";
import PurchaseSummaryPage from "./Pages/Cart Page/PurchaseSummary/PurchaseSummaryPage";
import ShippingServicePage from "./Pages/Cart Page/ShippingService/ShippingServicePage";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/LoginPage/auth/LoginPage";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import RecoverPasswordPage from "./Pages/RecoverPassword/RecoverPasswordPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import StoreProducts from "./Pages/StoreProducts/StoreProducts";
import Error404 from "./Pages/Error404/Error404";
import UserAccount from "./Pages/User account/UserAccount";
import UserMessage from "./Pages/UserMessages/UserMessage";

import {
  removeAllProductFromCart,
  selectProductsCartList,
  selectTotalCount,
} from "./Reducers/cartSlice";

import {
  addSavedProductToCart,
  documentIsCharged,
  selectIsCharged,
} from "./Reducers/savedCartSlice";

import { logout, selectIsLoggedin, selectUser } from "./Reducers/userSlice";

import { checkAndHandleCartDocument } from "./helpers/firebaseHelpers/firestoreHelpers";

//------------------------------------------------------------------------------------

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [userId, setUserId] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedin);
  const totalCount = useSelector(selectTotalCount);
  const productsCartList = useSelector(selectProductsCartList);
  const userData = useSelector(selectUser);
  const db = getFirestore();
  const isCharged = useSelector(selectIsCharged);

  const checkIfDocumentExists = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "cartProducts", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(documentIsCharged(true));
        dispatch(addSavedProductToCart(userData.cart.productsCartList));
      } else {
        console.error("El documento no existe");
      }
    } catch (error) {
      console.error("Error al verificar el documento:", error);
    }
  };

  useEffect(() => {
    let signoutTimer;
    let countdownTimer;
    const resetSignoutTimer = () => {
      clearTimeout(signoutTimer);
      signoutTimer = setTimeout(() => {
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
            console.error(errorMessage);
          });
      }, 3600000);
    };

    const handleUserActivity = () => {
      resetSignoutTimer();
    };

    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    const onAuthStateChangedListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        resetSignoutTimer();
        if (!isCharged) {
          checkIfDocumentExists(user.uid);
        }
      } else {
        setUserId("");
      }
    });

    return () => {
      clearTimeout(signoutTimer);
      clearTimeout(countdownTimer);
      onAuthStateChangedListener();
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, userId, isCharged]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/store/:category" element={<StoreProducts />} />
          <Route
            exact
            path="/product-description/:title"
            element={<ProductDescription />}
          />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/sign-in" element={<LoginPage />} />
          <Route exact path="/sign-up" element={<SignUpPage />} />
          <Route exact path="/user-messages" element={<UserMessage />} />
          <Route
            exact
            path="/recover-password"
            element={<RecoverPasswordPage />}
          />
          {/* Rutas protegidas que solo se muestran si el usuario está logueado */}
          {isLoggedIn ? (
            <>
              <Route
                exact
                path="/payement-methods"
                element={<PayementMethodsPage />}
              />
              <Route exact path="/user-account" element={<UserAccount />} />
              <Route
                exact
                path="/credit-card-form"
                element={<CreditCardPage />}
              />
              <Route
                exact
                path="/shipping-service"
                element={<ShippingServicePage />}
              />
              <Route
                exact
                path="/purchase-summary"
                element={<PurchaseSummaryPage />}
              />
            </>
          ) : (
            // Ruta para mostrar cuando el usuario no está logueado
            <Route path="*" element={<Error404 />} />
          )}
          {/* Ruta para mostrar cuando la URL no existe */}
          <Route path="*" element={<Error404 />} />
        </Routes>
   <Footer/>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
