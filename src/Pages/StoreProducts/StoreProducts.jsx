import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
  addProductToCart,
  removeProductFromCart, selectProductsCartList
} from "../../Reducers/cartSlice";

import { Delete, ShoppingCartCheckoutTwoTone } from "@mui/icons-material";

//-----------------------------------------------------------------------------------


function StoreProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const productsInCart = useSelector(selectProductsCartList);
  const [productsInStore, setProductsInStore] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categorie } = useParams("allProducts");

  const handleAddRemoveProductFromCart = (productId) => {
    const product = allProducts.find((product) => product.id === productId);
    const findProduct = productsInCart.find(
      (product) => product.id === productId
    );
    if (findProduct) {
      dispatch(removeProductFromCart(productId));
    } else {
      dispatch(addProductToCart(product));
    }
  };


  useEffect(() => {
    const productsRequest = async () => {
      try {
        const request = await fetch(`https://dummyjson.com/products?limit=100`);
        const res = await request.json();
        localStorage.setItem("allProducts", JSON.stringify(res.products));
        const productsWithQuantity = res.products.map((product) => ({
          ...product,
          quantity: Number(1),
        }));
        return productsWithQuantity;
      } catch (error) {
        throw new Error(`Something went wrong | Error: ${error}`);
      }
    };

    productsRequest().then((data) => {
      setAllProducts(data);
    });
  }, []);

  useEffect(() => {
    const handleCategoriesSelected = (categorie) => {
      const result = allProducts.filter(
        (product) => product.category === categorie
      );
      setProductsInStore(result);
    };
    setProductsInStore(allProducts); // Establece todos los productos por defecto

    if (categorie !== "all products") {
      handleCategoriesSelected(categorie);
    }
  }, [categorie, allProducts]);

  return (
    <>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Typography gutterBottom variant="h4" component="div">
          {categorie.toUpperCase()}
        </Typography>
      </Box>
      <Grid
        className="mt-5"
        container
        direction="row"
        wrap="wrap"
        columnGap={1}
        rowGap={3}
        justifyContent="space-evenly"
      >
        {productsInStore.map((product) => (
          <Grid key={product.id} item xs={11} sm={5} md={4} lg={3}>
            <Card>
              <Link to={`/product-description/${product.title}`}>
                <CardMedia
                  sx={{ height: 250 }}
                  image={product.thumbnail}
                  title={product.title}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography component="span">$ {product.price}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
              </CardContent>
              <CardActions className="mb-3">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    navigate(`/product-description/${product.title}`)
                  }
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color={
                    productsInCart.find((pdt) => pdt.id === product.id)
                      ? "error"
                      : "primary"
                  }
                  onClick={() => handleAddRemoveProductFromCart(product.id)}
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default StoreProducts;
