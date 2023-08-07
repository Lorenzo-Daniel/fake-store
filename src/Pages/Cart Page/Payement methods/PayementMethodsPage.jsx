import { Container, Typography, Divider } from "@mui/material";
import {
  StyledRoot,
  StyledSection,
  StyledContent,
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
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_payement_methods.svg"
              alt="payement-methods"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Payement Methods
            </Typography>
            <Divider sx={{ mb: 5 }} />

            <PayementMethods />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default PayementMethodsPage;
