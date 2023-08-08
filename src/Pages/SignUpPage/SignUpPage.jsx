import useResponsive from "../../hooks/useResponsive";
import SignUpForm from "./SignUpForm/SignUpForm";

//-------------------------------------------------------------------

import { Container, Typography, Divider } from "@mui/material";

// ----------------------------------------------------------------------

import {
  StyledRoot,
  StyledSection,
  StyledContent,
} from "../../helpers/Layout-helper/layout";

//----------------------------------------------------------------------

function SignUpPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome!!
            </Typography>
            <img src="/assets/illustrations/illustration_signUp.jpg" alt="signUp" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <StyledSection sx={{ mb: 3, display: {  md: "none" } ,maxWidth:'600px' }}>
              <img src="/assets/illustrations/illustration_signUp.jpg" 
              alt="login" />
            </StyledSection>
            <SignUpForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default SignUpPage;
