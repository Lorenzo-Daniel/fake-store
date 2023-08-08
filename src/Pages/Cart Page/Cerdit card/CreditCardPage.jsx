import useResponsive from "../../../hooks/useResponsive";
import CreditCardForm from "./CreditCardForm";

import { Container, Divider, Typography } from "@mui/material";

import {
  StyledContent,
  StyledRoot,
  StyledSection,
} from "../../../helpers/Layout-helper/layout";

//----------------------------------------------------------------------

function CreditCardPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img
              src="/assets/illustrations/illustration_credit_card1.jpg"
              alt="credit-card1"
            />
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Credit Card
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <StyledSection sx={{ mb: 3, display: { sm: "block", md: "none" } }}>
              <img
                src="/assets/illustrations/illustration_credit_card1.jpg"
                alt="credit-card1"
              />
            </StyledSection>
            <CreditCardForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default CreditCardPage;
