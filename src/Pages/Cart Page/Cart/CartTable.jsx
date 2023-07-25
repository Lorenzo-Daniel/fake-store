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
  Alert,Tab,Tabs
} from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  addQuantityProduct,
  removeQuantityProduct,
} from "../../../Reducers/cartSlice";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  removeAllProductFromCart,
  removeProductFromCart,
  selectProductsCartList,
} from "../../../Reducers/cartSlice";

import { selectUserIsLogeedIn } from "../../../Reducers/userSlice";

function CartTable() {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsCartList);
  
  const [subTotal, setSubTotal] = useState("");
  const [necesaryLogginWarning, setNecesaryLogginWarning] = useState(false);
  const userIsLoggedIn = useSelector(selectUserIsLogeedIn);
  const handleRemoveProduct = (productId) => {
    dispatch(removeProductFromCart(productId));
  };
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const checkoutHandler = () => {
    if (!userIsLoggedIn) {
      setNecesaryLogginWarning((prev) => !prev);
    } else {
      navigate("/payement-methods");
    }
  };
  const handleChange = () => {
    setValue(prev => prev === 0 ? 1 : 0);
  
  };
  useEffect(() => {
    if (productsInCart.length > 0) {
      const totalSum = productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      setSubTotal(totalSum);
    }
  }, [productsInCart, subTotal]);

  return (
    <Box>
      <Box>
        <Typography variant="h4" mt={2}>
          Cart
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Item One"  />
          <Tab label="Item Two"  />
        </Tabs>
      </Box>
    </Box>
      {productsInCart.length > 0 ? (
        <TableContainer sx={{ width: "100%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right" sx={{ minWidth: "80px" }}>
                  Price
                </TableCell>
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
              <Button variant="outlined" onClick={checkoutHandler}>
                checkout
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
          {necesaryLogginWarning && (
            <Alert
              severity="warning"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography variant="span">
                You must be logged in to continue.
              </Typography>
              <br />
              <Typography variant="span">
                You have an account?
                <Button variant="text" onClick={()=>navigate('/loginPage')}>sing in</Button>
              </Typography>
              <br />
              <Typography variant="span">
                You dont have an account?
                <Button variant="text" onClick={()=>navigate('/signUp')}>sing Up</Button>
              </Typography>
            </Alert>
          )}
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
