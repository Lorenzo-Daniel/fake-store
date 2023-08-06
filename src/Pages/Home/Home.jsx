import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ position: "relative", height: "100vh" }} />
        <Button
          sx={{
            backgroundColor: "#bdcffa",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
