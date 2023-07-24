import { styled } from "@mui/material/styles";
import useResponsive from "../../../hooks/useResponsive";

//-------------------------------------------------------------------

import { Container } from "@mui/material";
import PayementMethods from "./PayementMethods";
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

function PayementMethodsPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{ height: "100vh" }}>
            <img
              src="/assets/illustrations/illustration_payement_methods.svg"
              alt="payement-methods"
            />
          </StyledSection>
        )}
        <Container>
          <PayementMethods/>
        </Container>
      </StyledRoot>
    </>
  );
}

export default PayementMethodsPage;
