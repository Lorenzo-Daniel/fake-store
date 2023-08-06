import { Container } from "@mui/material";
import {
  StyledRoot,
  StyledSection,
} from "../../../helpers/Layout-helper/layout";

import useResponsive from "../../../hooks/useResponsive";
import PayementMethods from "./PayementMethods";

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
          <PayementMethods />
        </Container>
      </StyledRoot>
    </>
  );
}

export default PayementMethodsPage;
