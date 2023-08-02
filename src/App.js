import "bootstrap/dist/css/bootstrap.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import CartPage from "./Pages/Cart Page/Cart/CartPage";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/LoginPage/auth/LoginPage";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import RecoverPasswordPage from "./Pages/RecoverPassword/RecoverPasswordPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import StoreProducts from "./Pages/StoreProducts/StoreProducts";
import UserAccount from "./Pages/User account/UserAccount";
import { checkAndHandleCartDocument } from "./helpers/firebaseHelpers/firestoreHelpers";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import CreditCardPage from "./Pages/Cart Page/Cerdit card/CreditCardPage";
import PayementMethodsPage from "./Pages/Cart Page/Payement methods/PayementMethodsPage";
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
import { logout, selectUser } from "./Reducers/userSlice";
import ShippingServicePage from "./Pages/Cart Page/ShippingService/ShippingServicePage";
import PurchaseSummaryPage from "./Pages/Cart Page/PurchaseSummary/PurchaseSummaryPage";
function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [userId, setUserId] = useState("");
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
          <Route exact path="/store/:categorie" element={<StoreProducts />} />
          <Route
            exact
            path="/product-description/:title"
            element={<ProductDescription />}
          />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/loginPage" element={<LoginPage />} />
          <Route exact path="/signUp" element={<SignUpPage />} />
          <Route
            exact
            path="/payement-methods"
            element={<PayementMethodsPage />}
          />
          <Route exact path="/user-messages" element={<UserMessage />} />
          <Route exact path="/user-account" element={<UserAccount />} />
          <Route exact path="/credit-card-form" element={<CreditCardPage />} />
          <Route exact path="/shipping-service" element={<ShippingServicePage />} />
          <Route exact path="/purchase-summary" element={<PurchaseSummaryPage />} />

          <Route
            exact
            path="/recover-password"
            element={<RecoverPasswordPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
