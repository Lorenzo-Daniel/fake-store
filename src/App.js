import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import CartPage from "./Pages/Cart/CartPage";
import Navbar from "./Components/Navbar";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import StoreProducts from "./Pages/StoreProducts/StoreProducts";
import LoginPage from "./Pages/LoginPage/auth/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import RecoverPasswordPage from "./Pages/RecoverPassword/RecoverPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { checkAndHandleCartDocument } from "./helpers/firebaseHelpers/firestoreHelpers";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { logout } from "./Reducers/userSlice";
import { selectUser } from "./Reducers/userSlice";
import {
  selectTotalCount,
  selectProductsCartList,
  removeAllProductFromCart,
  updateCartProductsList,
  updateTotalCounterCart,
} from "./Reducers/cartSlice";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [userId, setUserId] = useState("");
  // const [documentExist,setDocumentExist] = useState(false)
  const totalCount = useSelector(selectTotalCount);
  const productsCartList = useSelector(selectProductsCartList);
  const userData = useSelector(selectUser);
  const db = getFirestore();

  const checkIfDocumentExists = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "cartProducts", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(updateCartProductsList(userData.cart.productsCartList));
        dispatch(updateTotalCounterCart(userData.cart.totalCount));
      } else {
        // El documento no existe, haz otra cosa
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
        checkIfDocumentExists(user.uid);
        resetSignoutTimer();
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
  }, [auth, userId]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/store/:categorie" element={<StoreProducts />} />
          <Route
            exact
            path="/description/:title"
            element={<ProductDescription />}
          />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/loginPage" element={<LoginPage />} />
          <Route exact path="/signUp" element={<SignUpPage />} />
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
