import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            // marginTop: "50px",
            // backgroundImage:
            //   "url('/assets/illustrations/illustration_home.jpg')",
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
            // maxHeight: "900px",
          }}
        ></Box>
        <Button
          sx={{
            backgroundColor:'#bdcffa',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: "200px",
            // height: "50px",
            // fontSize: "20px",
            // fontWeight: "bold",
            // color: "#1c118f",
            // "&:hover": {
            //   backgroundColor: "#7d97f2",
            //   color: "#e5ecfc",
            // },
          }}
          variant={"outlined"}
          size="small"
          onClick={() => navigate("/store/all products")}
        >
          Go To Store
        </Button>
      </Box>
    </>
  );
}

export default Home;
