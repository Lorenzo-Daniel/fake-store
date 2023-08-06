import useResponsive from "../../../hooks/useResponsive";
import CreditCardForm from "./CreditCardForm";

import { Container } from "@mui/material";

import {StyledRoot,StyledSection} from '../../../helpers/Layout-helper/layout'

//----------------------------------------------------------------------

function CreditCardPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{ height: "100vh" }}>
            <img
              src="/assets/illustrations/illustration_credit_card1.jpg"
              alt="credit-card1"
            />
          </StyledSection>
        )}
        <Container>
        <CreditCardForm></CreditCardForm>
        </Container>
      </StyledRoot>
    </>
  );
}

export default CreditCardPage;
