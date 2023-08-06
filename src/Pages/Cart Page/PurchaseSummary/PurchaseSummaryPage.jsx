import { Container, Typography } from "@mui/material";
import {
  StyledRoot,
  StyledSection,
} from "../../../helpers/Layout-helper/layout";
import useResponsive from "../../../hooks/useResponsive";
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
