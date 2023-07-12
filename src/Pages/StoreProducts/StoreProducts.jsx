import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../Reducers/cartSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { Delete,ShoppingCartCheckoutTwoTone } from "@mui/icons-material";

function StoreProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [productList, setProductList] = useState(allProducts);
  const { productsList } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { categorie } = useParams("allProducts");
  const productsRequest = async () => {
    try {
      const request = await fetch(`https://dummyjson.com/products?limit=100`);
      const res = await request.json();
      localStorage.setItem("allProducts", JSON.stringify(res.products));
    } catch (error) {
      throw new Error(`Somethin went wrong | Error : ${error}`);
    }
  };

  const filter = allProducts.filter(
    (product) => product.category === "skincare"
  );
  console.log(filter);

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
    
  const handleCategoriesSelected = (categorie) => {
    const result = allProducts.filter(
      (product) => product.category === categorie
    );
    setProductList(result);
  };
    setAllProducts(
      JSON.parse(localStorage.getItem("allProducts")) || productsRequest()
    );
    setProductList(allProducts)
    if (categorie === "all products") {
      setAllProducts(
        JSON.parse(localStorage.getItem("allProducts")) || productsRequest()
      );
    } else {
      handleCategoriesSelected(categorie);
    }
  }, [categorie,allProducts]);
  console.log(allProducts);
  return (
    <>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center",textAlign:'center'}}>
        <Typography gutterBottom variant="h4" component="div">
          {categorie.toUpperCase()}
        </Typography>
      </Box>
      <Grid
        className="mt-5"
        container
        direction={"row"}
        wrap={"wrap"}
        columnGap={1}
        rowGap={3}
        justifyContent={"space-evenly"}
      >
        {productList.map((product) => {
          return (
            <Grid key={product.id} item xs={11} sm={5} md={4} lg={3}>
              <Card>
                <CardMedia
                  sx={{ height: 250 }}
                  image={product.thumbnail}
                  title={product.title}
                />
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
                    onClick={() => navigate(`/description/${product?.title}`)}
                  >
                    Learn More
                  </Button>
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
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default StoreProducts;

