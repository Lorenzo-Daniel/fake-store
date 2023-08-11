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
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
             Credit Card
            </Typography>
            <img
              src="/assets/illustrations/illustration_credit_card.jpg"
              alt="credit-card1"
              width={'100%'}
            />
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <StyledSection sx={{ mb: 3, display: { sm: "block", md: "none" } }}>
              <img
                src="/assets/illustrations/illustration_credit_card.jpg"
                alt="credit-card1"
                width={'100%'}
              />
            </StyledSection>
            <Typography variant="h4" gutterBottom>
              Credit Card Data
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <CreditCardForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default CreditCardPage;
