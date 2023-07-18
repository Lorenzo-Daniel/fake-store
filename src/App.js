import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Navbar from "./Components/Navbar";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import StoreProducts from "./Pages/StoreProducts/StoreProducts";
import LoginPage from "./Pages/LoginPage/auth/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import RecoverPasswordPage from "./Pages/RecoverPassword/RecoverPasswordPage";

function App() {
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
          <Route exact path="/recover-password" element={<RecoverPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
