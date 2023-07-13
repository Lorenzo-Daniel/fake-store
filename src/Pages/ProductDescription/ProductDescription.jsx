import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button, Box, Grid } from "@mui/material";
import { ShoppingCartCheckoutTwoTone, Delete } from "@mui/icons-material";
import {
  removeProductFromCart,
  addProductToCart,
} from "../../Reducers/cartSlice";

function ProductDescription() {
  const [product, setProduct] = useState({});
  const [img, setImg] = useState([]);
  const { title } = useParams();
  const { productsList } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getProductTitle = (title) => {
    const getAllProducts = JSON.parse(localStorage.getItem("allProducts"));
    const findProduct = getAllProducts.find(
      (product) => product.title === title
    );
    setProduct(findProduct);
    setImg(findProduct.images);
  };


  const handleAddRemoveProductToCart = (productId) => {
    const findProduct = productsList.find((pdt) => pdt.id === productId);
    if (findProduct) {
      dispatch(removeProductFromCart(productId));
    } else {
      dispatch(addProductToCart(product));
    }
  };
  
  useEffect(() => {
    getProductTitle(title);
  }, [title]);

  return (
    <>
    {/* className="d-flex flex-column mt-4 mb-5 m-auto col-sm-10 col-md-8" */}
      <Grid className="d-flex flex-column mt-4 mb-5 m-auto col-sm-10 col-md-8">
        <h1 className="text-center mb-4"> {product.title}</h1>
        <div className="m-auto p-2">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {img.map((img, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="w-100 d-flex justify-content-center align-items-center"
                >
                  <img src={img} alt={img} className="swiper-slide-img" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="p-2">
          <p className="text-center mt-2">{product.description}</p>
          <p className="text-center">{product.brand}</p>
          <hr className="w-75 m-auto" />
          <div className="w-75 m-auto d-md-flex justify-content-between align-items-center mt-4">
            <div>
              <p>
                Price: <strong>${product.price}</strong>
              </p>
              <p>
                Discount: <strong>{product.discountPercentage}</strong>%
              </p>
              <p>
                Cateory: <strong>{product.category}</strong>
              </p>
            </div>
            <div className="d-flex flex-column">
              <Button
                size="small"
                variant="outlined"
                color={`${
                  productsList.find((pdt) => pdt.id === product.id)
                    ? "error"
                    : "primary"
                }`}
                onClick={() => handleAddRemoveProductToCart(product.id)}
              >
                {productsList.find((pdt) => pdt.id === product.id) ? (
                  <Box>
                    Remove FROM CART
                    <Delete />
                  </Box>
                ) : (
                  <Box>
                    Add To Cart
                    <ShoppingCartCheckoutTwoTone />
                  </Box>
                )}
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                color="warning"
                onClick={() => navigate(-1)}
              >
                Back to Store
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default ProductDescription;
