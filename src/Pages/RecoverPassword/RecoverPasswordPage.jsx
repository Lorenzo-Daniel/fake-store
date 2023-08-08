import { Container, Divider, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import RecoverPasswordForm from "./RecoverPasswordForm";

import {
  StyledContent,
  StyledRoot,
  StyledSection,
} from "../../helpers/Layout-helper/layout";

// ----------------------------------------------------------------------

function RecoverPasswordPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              Recover your password!
            </Typography>
            <img
              src="/assets/illustrations/illustration_recover_password.svg"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Recover your password!
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <StyledSection sx={{ mb: 3, display: { sm: "block", md: "none" } }}>
              <img
                src="/assets/illustrations/illustration_recover_password.svg"
                alt="login"
              />
            </StyledSection>
            <RecoverPasswordForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default RecoverPasswordPage;
