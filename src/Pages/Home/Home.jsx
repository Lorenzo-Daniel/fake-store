import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../Reducers/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../Components/Navbar";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const { productsList } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const productsRequest = async () => {
    try {
      const request = await fetch(`https://dummyjson.com/products?limit=100`);
      const res = await request.json();
      localStorage.setItem("allProducts", JSON.stringify(res.products));
    } catch (error) {
      throw new Error(`Somethin went wrong | Error : ${error}`);
    }
  };

  const handleAddRemoveProductToCart = (productId) => {
    const product = allProducts.find((product) => product.id === productId);
    const findProduct = productsList.find(
      (product) => product.id === productId
    );
    if (findProduct) {
      dispacth(removeProductFromCart(productId));
    } else {
      dispacth(addProductToCart(product));
    }
  };

  useEffect(() => {
    setAllProducts(
      JSON.parse(localStorage.getItem("allProducts")) || productsRequest()
    );
  }, []);

  return (
    <div>
      <Navbar />
      <div className="col-11 col-md-12 mt-5 d-flex flex-wrap m-auto justify-content-center gap-3">
        {allProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="card-store col-12 col-md-5 col-lg-3"
            >
              <Link to={`/description/${product.title}`}>
                <img
                  src={product?.thumbnail}
                  className="card-img-store"
                  alt={product?.title}
                />
              </Link>
              <div className="card-description-store ">
                <div className="d-flex flex-column w-100">
                  <h5 className="">{product?.title}</h5>
                  <h5 className="">$ {product?.price}.</h5>
                </div>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <button
                    className="btn btn-primary "
                    onClick={() => navigate(`/description/${product?.title}`)}
                  >
                    Description
                  </button>
                  <div className=" d-flex">
                  
                    <span
                      className={`btn btn-sm ${
                        productsList.find((pdt) => pdt.id === product.id)
                          ? "btn-danger"
                          : "border"
                      }`}
                      onClick={() => handleAddRemoveProductToCart(product.id)}
                    >
                      {productsList.find((pdt) => pdt.id === product.id)
                        ? "Remove "
                        : "Add to Cart "}
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className={`fs-5  ${
                          productsList.find((pdt) => pdt.id === product.id) &&
                          "text-white"
                        }`}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
