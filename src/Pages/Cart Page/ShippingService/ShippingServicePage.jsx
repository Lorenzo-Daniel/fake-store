import useResponsive from "../../../hooks/useResponsive";
import { Container, Typography } from "@mui/material";
import {
  StyledSection,
  StyledRoot,
} from "../../../helpers/Layout-helper/layout";
import ShippingServiceForm from "./ShippingServiceForm";

function ShippingServicePage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection sx={{ height: "100vh" }}>
            <Typography variant="h4" mt={4} textAlign={"center"}>
              Shipping Service
            </Typography>
            <img
              src="/assets/illustrations/illustration_shipment_of_merchandise.jpg"
              alt="shipping"
            />
          </StyledSection>
        )}
        <Container>
          <ShippingServiceForm />
        </Container>
      </StyledRoot>
    </>
  );
}

export default ShippingServicePage;
