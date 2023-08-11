import useResponsive from "../../../hooks/useResponsive";
import { Container, Typography, Divider } from "@mui/material";

import {
  StyledSection,
  StyledRoot,
  StyledContent,
} from "../../../helpers/Layout-helper/layout";

import ShippingServiceForm from "./ShippingServiceForm";

function ShippingServicePage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Shipping Service
            </Typography>
            <img
              src="/assets/illustrations/illustration_shipment_of_merchandise.jpg"
              alt="shipping"
              width={'100%'}
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <StyledSection sx={{ mb: 3, display: { md: "none" } }}>
              <img
                src="/assets/illustrations/illustration_shipment_of_merchandise.jpg"
                alt="shipping"
                width={'100%'}
              />
            </StyledSection>
            <Typography variant="h4" gutterBottom>
              Delivery Data
            </Typography>
            <Divider  />
            <ShippingServiceForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default ShippingServicePage;
