import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
} from "@mui/material";

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} >
      <Button variant={'outlined'} size="large" onClick={()=>navigate('/store/all products')}>Go To Store</Button>
      </Box>
    </>
  );
}

export default Home;

