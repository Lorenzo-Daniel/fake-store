import { Container, Divider, Typography } from "@mui/material";
import {
  StyledRoot,
  StyledSection,
  StyledContent,
} from "../../../helpers/Layout-helper/layout";
import useResponsive from "../../../hooks/useResponsive";
import PurchaseSummary from "./PurchaseSummary";

function PurchaseSummaryPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" mt={4} textAlign={"center"}>
              Purchase Summary
            </Typography>
            <img
              src="/assets/illustrations/illustration_purchase_summary.svg"
              alt="shipping"
            />
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <StyledSection sx={{ mb: 3, display: { sm: "block", md: "none" } }}>
              <img
                src="/assets/illustrations/illustration_purchase_summary.svg"
                alt="shipping"
              />
            </StyledSection>
            <Typography  sx={{display:{md:'none'}}} variant="h4" my={2}>
              Purchase Summary
            </Typography>
            <Divider />
          <PurchaseSummary />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default PurchaseSummaryPage;
