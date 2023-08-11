import useResponsive from "../../../hooks/useResponsive";
import LoginForm from "./LoginForm";

//-------------------------------------------------------------------

import { Container, Typography, Divider } from "@mui/material";

// ----------------------------------------------------------------------

import {
  StyledRoot,
  StyledSection,
  StyledContent,
} from "../../../helpers/Layout-helper/layout";

//----------------------------------------------------------------------

function LoginPage() {
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
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <StyledSection sx={{ mb: 3, display: { sm: "block", md: "none" } }}>
              <img
                src="/assets/illustrations/illustration_login.png"
                alt="login"
              />
            </StyledSection>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Divider sx={{ mb: 5 }} />

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default LoginPage;
