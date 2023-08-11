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
  removeProductFromCart,
  selectProductsCartList,
} from "../../Reducers/cartSlice";

import {
  selectAllProducts,
  setAllProducts,
} from "../../Reducers/productsSlice ";
import { Delete, ShoppingCartCheckoutTwoTone } from "@mui/icons-material";

//-----------------------------------------------------------------------------------

function StoreProducts() {
  const [categoryToShow, setCategoryToShow] = useState([]);
  const productsInCart = useSelector(selectProductsCartList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams("all products");
  const allProductsStorage = useSelector(selectAllProducts);

  const handleAddRemoveProductFromCart = (productId) => {
    const product = allProductsStorage.find(
      (product) => product.id === productId
    );
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
        if (!allProductsStorage) {
          const request = await fetch(
            `https://dummyjson.com/products?limit=100`
          );
          const res = await request.json();
          const productsWithQuantity = res.products.map((product) => ({
            ...product,
            quantity: Number(1),
          }));
          dispatch(setAllProducts(productsWithQuantity));
        }
      } catch (error) {
        throw new Error(`Something went wrong | Error: ${error}`);
      }
    };
    productsRequest();

    const handleCategoriesSelected = (category) => {
      const result = allProductsStorage.filter(
        (product) => product.category === category
      );
      setCategoryToShow(result);
    };

    setCategoryToShow(allProductsStorage);

    if (category !== "all products") {
      handleCategoriesSelected(category);
    }
  }, [category, allProductsStorage, dispatch]);

  return (
    <>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center",boxShadow:'0px 2px 3px 0px  #eceef1'}}>
        <Typography gutterBottom variant="h4" component="div">
          {category.toUpperCase()}
        </Typography>
      </Box>
      <Grid
        className="mt-3"
        container
        direction="row"
        justifyContent="flex-start"
        spacing={5}
        sx={{ paddingX: { xs: "5px", md: "15px", lg: "25px", xl: "200px" } }}
      >
        {categoryToShow?.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
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
              <CardActions
                className="mb-3"
                sx={{ display: "flex", justifyContent: "start" }}
              >
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

// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Grid,
//   Typography,
// } from "@mui/material";

// import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { Link, useNavigate, useParams } from "react-router-dom";

// import {
//   addProductToCart,
//   removeProductFromCart,
//   selectProductsCartList,
// } from "../../Reducers/cartSlice";

// import {
//   setAllProducts,
//   selectAllProducts,
// } from "../../Reducers/productsSlice ";
// import { Delete, ShoppingCartCheckoutTwoTone } from "@mui/icons-material";

// //-----------------------------------------------------------------------------------

// function StoreProducts() {
//   const [categoryToShow, setCategoryToShow] = useState();
//   const productsInCart = useSelector(selectProductsCartList);
//   // const [productsInStore, setProductsInStore] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { category } = useParams("all products");
//   const allProductsStorage = useSelector(selectAllProducts);

//   const handleAddRemoveProductFromCart = (productId) => {
//     const product = allProductsStorage.find(
//       (product) => product.id === productId
//     );
//     const findProduct = productsInCart.find(
//       (product) => product.id === productId
//     );
//     if (findProduct) {
//       dispatch(removeProductFromCart(productId));
//     } else {
//       dispatch(addProductToCart(product));
//     }
//   };

//   // console.log(allProductsStorage);
//   // const fetchCategoriesData = async () => {
//   //   try {
//   //     const categoriesData = await CategoryRequest();
//   //     setAllCategories(categoriesData);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // console.log(allProductsStorage);
//   useEffect(() => {
//     const productsRequest = async () => {
//       try {
//         if (!allProductsStorage) {
//           const request = await fetch(
//             `https://dummyjson.com/products?limit=100`
//           );
//           const res = await request.json();
//           const productsWithQuantity = res.products.map((product) => ({
//             ...product,
//             quantity: Number(1),
//           }));
//           dispatch(setAllProducts(productsWithQuantity));
//           return productsWithQuantity;
//         }
//       } catch (error) {
//         throw new Error(`Something went wrong | Error: ${error}`);
//       }
//     };
//     productsRequest();

//     const handleCategoriesSelected = (category) => {
//       const result = allProductsStorage.filter(
//         (product) => product.category === category
//       );
//       setCategoryToShow(result);
//     };

//     setCategoryToShow(allProductsStorage);

//     if (category !== "all products") {
//       handleCategoriesSelected(category);
//     }
//   }, [category, allProductsStorage, dispatch]);

//   return (
//     <>
//       <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
//         <Typography gutterBottom variant="h4" component="div">
//           {category.toUpperCase()}
//         </Typography>
//       </Box>
//       <Grid
//         className="mt-5"
//         container
//         direction="row"
//         wrap="wrap"
//         columnGap={1}
//         rowGap={3}
//         justifyContent="space-evenly"
//       >
//         {categoryToShow?.map((product) => (
//           <Grid key={product.id} item xs={11} sm={5} md={4} lg={3}>
//             <Card>
//               <Link to={`/product-description/${product.title}`}>
//                 <CardMedia
//                   sx={{ height: 250 }}
//                   image={product.thumbnail}
//                   title={product.title}
//                 />
//               </Link>
//               <CardContent>
//                 <Typography gutterBottom variant="h6" component="div">
//                   {product.title}
//                 </Typography>
//                 <Typography component="span">$ {product.price}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {product.category}
//                 </Typography>
//               </CardContent>
//               <CardActions className="mb-3">
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={() =>
//                     navigate(`/product-description/${product.title}`)
//                   }
//                 >
//                   Learn More
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="outlined"
//                   color={
//                     productsInCart.find((pdt) => pdt.id === product.id)
//                       ? "error"
//                       : "primary"
//                   }
//                   onClick={() => handleAddRemoveProductFromCart(product.id)}
//                 >
//                   {productsInCart.find((pdt) => pdt.id === product.id) ? (
//                     <Box>
//                       Remove FROM CART
//                       <Delete />
//                     </Box>
//                   ) : (
//                     <Box>
//                       Add To Cart
//                       <ShoppingCartCheckoutTwoTone />
//                     </Box>
//                   )}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// }

// export default StoreProducts;
