import { styled } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";

import CartTable from "./CartTable";
//-------------------------------------------------------------------

import { Container } from "@mui/material";
// ----------------------------------------------------------------------



const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "0px 0px 4px 0px #eceef1",
  backgroundColor: theme.palette.background.default,
}));


//----------------------------------------------------------------------

function Cart() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{ height: "100vh" }}>
            <img
              src="/assets/illustrations/illustration_cart.jpg"
              alt="login"
            />
          </StyledSection>
        )}
        <Container>
          <CartTable />
        </Container>
      </StyledRoot>
    </>
  );
}

export default Cart;
