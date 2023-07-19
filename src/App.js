import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Navbar from "./Components/Navbar";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import StoreProducts from "./Pages/StoreProducts/StoreProducts";
import LoginPage from "./Pages/LoginPage/auth/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import RecoverPasswordPage from "./Pages/RecoverPassword/RecoverPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { logout } from "./Reducers/userSlice";
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
  const totalCount = useSelector(selectTotalCount);
  const productsCartList = useSelector(selectProductsCartList);
  const db = getFirestore();

  const checkIfDocumentExists = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "cartProducts", userId));
      if (userDoc.exists()) {
        // El documento existe, haz algo con los datos
        const userData = userDoc.data();

          dispatch(updateCartProductsList(userData.cart.productsCartList));
          dispatch(updateTotalCounterCart(userData.cart.totalCount));
        console.log("Datos del usuario:", userData.cart.productsCartList);
        console.log("Datos del usuario:", userData.cart.totalCount);
      } else {
        // El documento no existe, haz otra cosa
        console.log("El documento no existe");
      }
    } catch (error) {
      console.log("Error al verificar el documento:", error);
    }
  };

  const checkAndHandleCartDocument = async (
    db,
    userId,
    totalCount,
    productsCartList
  ) => {
    try {
      const cartDoc = await getDoc(doc(db, "cartProducts", userId));
      if (cartDoc.exists()) {
        const cartData = {
          totalCount: totalCount,
          productsCartList: productsCartList,
        };
        await updateDoc(doc(db, "cartProducts", userId), {
          cart: cartData,
        });
      } else {
        const cartData = {
          totalCount: totalCount,
          productsCartList: productsCartList,
        };
        await setDoc(doc(db, "cartProducts", userId), {
          cart: cartData,
        });
      }
    } catch (error) {
      console.error(
        "Error al verificar y manejar el documento en cartProducts:",
        error
      );
    }
  };
  useEffect(() => {
    let signoutTimer;
    const resetSignoutTimer = () => {
      clearTimeout(signoutTimer);
      signoutTimer = setTimeout(() => {
        signOut(auth)
          .then(() => {
            checkAndHandleCartDocument(db, userId, totalCount, productsCartList)
              .then(() => {
                dispatch(logout());
                dispatch(removeAllProductFromCart());
                alert("Tu sesión expiró, ¡papá!");
              })
              .catch((error) => {
                console.error(
                  "Error al verificar y manejar el documento:",
                  error
                  );
                });
              })
              .catch((error) => {
                console.error("Error al cerrar la sesión:", error);
          });
        }, 3600000);
    };

    const handleUserActivity = () => {
      resetSignoutTimer();
    };
    
    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("mouseMouve", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    
    const verificarlogue = onAuthStateChanged(auth, (user) => {
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
      verificarlogue();
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("mouseMouve", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
    // eslint-disable-next-line
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
          <Route exact path="/cart" element={<Cart />} />
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

// import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./Pages/Home/Home";
// import Cart from "./Pages/Cart/Cart";
// import Navbar from "./Components/Navbar";
// import ProductDescription from "./Pages/ProductDescription/ProductDescription";
// import StoreProducts from "./Pages/StoreProducts/StoreProducts";
// import LoginPage from "./Pages/LoginPage/auth/LoginPage";
// import SignUpPage from "./Pages/SignUpPage/SignUpPage";
// import RecoverPasswordPage from "./Pages/RecoverPassword/RecoverPasswordPage";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import {
//   getFirestore,
//   setDoc,
//   doc,
//   getDoc,
//   updateDoc,
//   addDoc,
//   collection,
// } from "firebase/firestore";
// import { logout } from "./Reducers/userSlice";
// import {
//   selectTotalCount,
//   selectProductsCartList,
//   removeAllProductFromCart,
//   updateCartProductsList,
//   updateTotalCounterCart,
// } from "./Reducers/cartSlice";

// function App() {
//   const dispatch = useDispatch();
//   const auth = getAuth();
//   const [userId, setUserId] = useState("");
//   const totalCount = useSelector(selectTotalCount);
//   const productsCartList = useSelector(selectProductsCartList);
//   const cartData = {
//     totalCount: totalCount,
//     productsCartList: productsCartList,
//   };
//   console.log(userId);

//   console.log(cartData);
//   const db = getFirestore();

//   const checkIfDocumentExists = async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, "cartProducts", userId));
//       if (userDoc.exists()) {
//         // El documento existe, haz algo con los datos
//         const userData = userDoc.data();
//         dispatch(updateCartProductsList(userData.cart.productsCartList))
//         dispatch(updateTotalCounterCart(userData.cart.totalCount))
//         console.log("Datos del usuario:", userData.cart.productsCartList);
//         console.log("Datos del usuario:", userData.cart.totalCount);
//       } else {
//         // El documento no existe, haz otra cosa
//         console.log("El documento no existe");
//       }
//     } catch (error) {
//       console.log("Error al verificar el documento:", error);
//     }
//   };

//   const checkAndHandleCartDocument = async (
//     db,
//     userId,
//     totalCount,
//     productsCartList
//   ) => {
//     try {
//       const cartDoc = await getDoc(doc(db, "cartProducts", userId));
//       if (cartDoc.exists()) {
//         await updateDoc(doc(db, "cartProducts", userId), {
//           cart: { totalCount: totalCount, productsCartList: productsCartList },
//         });
//       } else {
//         await setDoc(doc(db, "cartProducts", userId), {
//           cart: { totalCount: totalCount, productsCartList: productsCartList },
//         });
//       }
//     } catch (error) {
//       console.error(
//         "Error al verificar y manejar el documento en cartProducts:",
//         error
//       );
//     }
//   };
//   useEffect(() => {
//     let signoutTimer;
//     const resetSignoutTimer = () => {
//       clearTimeout(signoutTimer);
//       signoutTimer = setTimeout(() => {
//         signOut(auth)
//           .then(() => {
//             checkAndHandleCartDocument(
//               db,
//               userId,
//               cartData,
//               totalCount,
//               productsCartList
//             ).then(() => {
//               dispatch(logout());
//               dispatch(removeAllProductFromCart());
//               alert("tu sesion expiro papa!");
//               return;
//             });
//           })
//           .catch((error) => {
//             console.error("Error al cerrar la sesión:", error);
//           });
//       }, 3600000);
//     };

//     const handleUserActivity = () => {
//       resetSignoutTimer();
//     };

//     window.addEventListener("mousedown", handleUserActivity);
//     window.addEventListener("keydown", handleUserActivity);
//     window.addEventListener("mouseMouve", handleUserActivity);
//     window.addEventListener("scroll", handleUserActivity);

//     const verificarlogue = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//         checkIfDocumentExists(user.uid);
//         resetSignoutTimer();
//         console.log("what?");
//       } else {
//         setUserId("");
//       }
//     });

//     return () => {
//       clearTimeout(signoutTimer);
//       verificarlogue();
//       window.removeEventListener("mousedown", handleUserActivity);
//       window.removeEventListener("keydown", handleUserActivity);
//       window.removeEventListener("mouseMouve", handleUserActivity);
//       window.removeEventListener("scroll", handleUserActivity);
//     };
//   }, [auth, userId, totalCount, productsCartList]);
//   return (
//     <div>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/store/:categorie" element={<StoreProducts />} />
//           <Route
//             exact
//             path="/description/:title"
//             element={<ProductDescription />}
//           />
//           <Route exact path="/cart" element={<Cart />} />
//           <Route exact path="/loginPage" element={<LoginPage />} />
//           <Route exact path="/signUp" element={<SignUpPage />} />
//           <Route
//             exact
//             path="/recover-password"
//             element={<RecoverPasswordPage />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
// export default App;
