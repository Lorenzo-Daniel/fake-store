import useResponsive from "../../../hooks/useResponsive";
import CartTable from "./CartTable";
import { Container } from "@mui/material";

import {StyledRoot,StyledSection} from '../../../helpers/Layout-helper/layout'

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
              alt="cart-page"
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
