import { Delete, ShoppingCartCheckoutTwoTone } from "@mui/icons-material";

import { Box, Button, Grid, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";

import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  addProductToCart,
  removeProductFromCart,
  selectProductsCartList,
} from "../../Reducers/cartSlice";

//---------------------------------------------------------------------

function ProductDescription() {
  const [product, setProduct] = useState({});
  const [img, setImg] = useState([]);
  const { title } = useParams();
  const productsInCart = useSelector(selectProductsCartList);
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
    const findProduct = productsInCart.find((pdt) => pdt.id === productId);
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
      <Grid container>
        <Grid item xs={12} sm={10} md={8} margin={"auto"}>
          <Box mt={5}>
            <Typography gutterBottom variant={"h4"} textAlign={"center"}>
              {product?.title}
            </Typography>
            <Box padding={2}>
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
            </Box>
            <Box padding={3}>
              <Typography paragraph textAlign={"center"}>
                {product.description}
              </Typography>
              <Typography paragraph textAlign={"center"}>
                {product.brand}
              </Typography>
              <hr className="m-auto mb-4" />
              <Box
                display={"flex"}
                justifyContent={{ sm: "space-between" }}
                alignItems={{ sm: "center" }}
                flexWrap={"wrap"}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Box>
                  <Typography paragraph>
                    Price: <strong>${product.price}</strong>
                  </Typography>
                  <Typography paragraph>
                    Discount: <strong>{product.discountPercentage}</strong>%
                  </Typography>
                  <Typography paragraph>
                    Cateory: <strong>{product.category}</strong>
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Button
                    size="small"
                    variant="outlined"
                    color={`${
                      productsInCart.find((pdt) => pdt.id === product.id)
                        ? "error"
                        : "primary"
                    }`}
                    onClick={() => handleAddRemoveProductToCart(product.id)}
                  >
                    {productsInCart.find((pdt) => pdt.id === product.id) ? (
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
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductDescription;
