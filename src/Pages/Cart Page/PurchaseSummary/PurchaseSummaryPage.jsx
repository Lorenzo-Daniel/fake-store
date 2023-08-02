import useResponsive from "../../../hooks/useResponsive";
import { Container, Typography } from "@mui/material";
import {
  StyledSection,
  StyledRoot,
} from "../../../helpers/Layout-helper/layout";
import PurchaseSummary from "./PurchaseSummary";

function PurchaseSummaryPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{ height: "100vh" }}>
            <Typography variant="h4" mt={4} textAlign={"center"}>
              Purchase Summary
            </Typography>
            <img
              src="/assets/illustrations/illustration_purchase_summary.svg"
              alt="shipping"
            />
          </StyledSection>
        )}
        <Container>
        <PurchaseSummary/>
        </Container>
      </StyledRoot>
    </>
  );
}

export default PurchaseSummaryPage;
