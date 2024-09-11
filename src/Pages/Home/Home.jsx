import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box} from "@mui/material";
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 6em)",
          justifyContent: "center",
          display: "flex",
          position: "relative",
          backgroundColor: "#8fd3f8",
          overflow:'hidden'
        }}
      >
        <img
        className=""
          src="/assets/illustrations/home.jpg "
          alt=""
        />

        <Button
          sx={{
            backgroundColor: "#bdcffa",
            position: "absolute",
            top: "20px",
            right: "20px",
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
