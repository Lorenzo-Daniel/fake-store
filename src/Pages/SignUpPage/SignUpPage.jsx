import {
  Container,
  Typography,
  Divider
} from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import SignUpForm from "./SignUpForm/SignUpForm";


import { StyledContent, StyledRoot, StyledSection } from '../../helpers/Layout-helper/layout';
// ----------------------------------------------------------------------

function SignUpPage() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome!
            </Typography>
            <img
              src="/assets/illustrations/illustration_signUp.jpg"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography  variant="h4" gutterBottom>
              Sign up
            </Typography>
           <Divider sx={{mb:5}}/>
            <SignUpForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default SignUpPage;
