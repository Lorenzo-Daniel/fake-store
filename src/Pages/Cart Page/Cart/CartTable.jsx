import { Add, DeleteForever, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addQuantityProduct,
  removeQuantityProduct,
} from "../../../Reducers/cartSlice";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  removeAllProductFromCart,
  removeProductFromCart,
  selectProductsCartList,
} from "../../../Reducers/cartSlice";

function CartTable() {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsCartList);
  const [subTotal, setSubTotal] = useState("");
  const handleRemoveProduct = (productId) =>
    dispatch(removeProductFromCart(productId));
  // const checkOut = () => {
  //   const algo = productsInCart[0];
  //   console.log(algo.quantity * algo.price);
  //   const totalSum = productsInCart.reduce(
  //     (acc, product) => acc + product.price * product.quantity,
  //     0
  //   );
  //   console.log(totalSum);
  // };

  useEffect(() => {
    if (productsInCart.length > 0) {
      const totalSum = productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      setSubTotal(totalSum);
    }
  }, [productsInCart, subTotal]);

  console.log(subTotal);
  return (
    <Box>
      <Box>
        <Typography variant="h3" mt={2}>
          Cart
        </Typography>
      </Box>
      {productsInCart.length > 0 ? (
        <TableContainer sx={{ width: "100%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInCart.map((product, index) => {
                return (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box>
                        <Link
                          to={`/product-description/${product.title}`}
                          className="nav-link"
                        >
                          {product.title}{" "}
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            width={"60px"}
                          />
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align="right">$ {product.price}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>

                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        <Paper>
                          <button
                            className="quantity-cart"
                            onClick={() =>
                              dispatch(removeQuantityProduct(product.id))
                            }
                          >
                            <Remove fontSize="12px" />
                          </button>
                        </Paper>
                        <Typography sx={{ p: 1 }}>
                          {product.quantity}
                        </Typography>
                        <Paper>
                          <button
                            className="quantity-cart"
                            onClick={() =>
                              dispatch(addQuantityProduct(product.id))
                            }
                          >
                            <Add fontSize="12px" />
                          </button>
                        </Paper>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <DeleteForever />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Divider />
          <Container>
            <Box display={"flex"} justifyContent={"end"} my={2}>
              <Typography variant="span">Subtotal: $ {subTotal}</Typography>
            </Box>
          </Container>
          <Divider />
          <Box display={"flex"} justifyContent={"end"} my={5}>
            <Box display={"flex"} flexDirection={"column"} rowGap={2}>
              <Button variant="outlined">
                <Link to={"/payement-methods"} className="nav-link">
                  checkout
                </Link>
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(removeAllProductFromCart())}
              >
                <DeleteForever /> delete all
              </Button>
            </Box>
          </Box>
        </TableContainer>
      ) : (
        <Grid container mt={5}>
          <Grid item xs={12} lg={10} margin={"auto"}>
            <Typography variant="h4" textAlign={"center"}>
              Your cart is empty!
            </Typography>
            <Box my={5}>
              <img
                src="/assets/illustrations/illustration_empty_cart.jpg"
                alt="empty-cart"
                width={"100%"}
                className="rounded"
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default CartTable;
