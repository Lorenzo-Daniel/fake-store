import { styled } from "@mui/material/styles";
import {
  Container,
  Divider,
  Typography,
} from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import RecoverPasswordForm from './RecoverPasswordForm'

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

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
            <Typography variant="h5" gutterBottom>
            Recover your password!
            <Divider sx={{my:2}}/>
            </Typography>
           
            <RecoverPasswordForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default RecoverPasswordPage;
