import useResponsive from "../../../hooks/useResponsive";
import CartTable from "./CartTable";
import { Container, Typography,Box } from "@mui/material";

import {
  StyledRoot,
  StyledSection,
  StyledContent,
} from "../../../helpers/Layout-helper/layout";

//----------------------------------------------------------------------

function Cart() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Shopping Cart
            </Typography>
          
              <img
                src="/assets/illustrations/illustration_cart.svg "
                alt="cart-page"
                width={'100%'}
              />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <StyledSection sx={{ mb: 3, display: { sm: "block", md: "none" } }}>
              <Box sx={{ maxWidth: "800px" }}>
                <img
                  src="/assets/illustrations/illustration_cart.svg "
                  alt="cart-page"
                  width={'100%'}
                />
              </Box>
            </StyledSection>

            <CartTable />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default Cart;
