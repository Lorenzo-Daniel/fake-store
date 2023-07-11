import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate,Link} from "react-router-dom";
import { useSelector} from "react-redux";

function Navbar() {
  const [allCategories, setAllCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const CategoryRequest = async () => {
    try {
      const request = await fetch(`https://dummyjson.com/products/categories`);
      const res = await request.json();
      localStorage.setItem("categoriesList", JSON.stringify(res));
    } catch (error) {
      throw new Error(`Something went wrong | Error : ${error}`);
    }
  };

  const onclickOutSideHandle = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {

    setAllCategories(
      JSON.parse(localStorage.getItem("categoriesList")) 
      || CategoryRequest()
    );
    document.addEventListener("mousedown", onclickOutSideHandle);
    return () => {
      document.removeEventListener("mousedown", onclickOutSideHandle);
    };
    // ;
  }, []);

  const back = () => {
    navigate("/");
  };
  return (
    <header className=" shadow p-2 sticky-top bg-white  ">
      <nav className="navbar-store ">
        <FontAwesomeIcon
          icon={faBars}
          className="burger-icon "
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <div>
          <h1 className="text-center" onClick={() => back()}>
            Fake Store
          </h1>
        </div>
        <div className="navbar-cart-icon">
          <Link to={'/cart'} type="button" className="btn position-relative">
          <FontAwesomeIcon icon={faCartShopping}  className="fs-2"/>
            <span className="position-absolute   start-100 translate-middle badge  bg-danger">
             {cart.totalCount}
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link>
        </div>
      </nav>
      {isOpen && (
        <div className="menu" ref={ref}>
          <div className="d-flex justify-content-end ">
            <FontAwesomeIcon
              icon={faClose}
              className="fs-4 m-1"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
          <div className="d-flex flex-column align-items-start">
            {allCategories.map((category) => {
              return (
                <input
                  key={category}
                  type="button"
                  value={category.toUpperCase()}
                  className="btn"
                />
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
