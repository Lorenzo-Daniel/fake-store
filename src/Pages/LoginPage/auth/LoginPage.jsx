import { styled } from "@mui/material/styles";
import useResponsive from "../../../hooks/useResponsive";
import LoginForm from "./LoginForm";

//-------------------------------------------------------------------

import {
  Container,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

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

//----------------------------------------------------------------------

function LoginPage() {
  const mdUp = useResponsive("up", "md");
  // const signInWithGoogle = () => {
    
  //   signInWithPopup(auth, googleProvider)
  //     .then((userCredential) => {
  //       // Inicio de sesión exitoso con Google
  //       const user = userCredential.user;
  //       console.log(user);
  //       dispatch(setUser(user))
  //       dispatch(login())
  //       navigate("/store/all products")
  //       // Realiza acciones adicionales después del inicio de sesión
  //     })
  //     .catch((error) => {
  //       // Manejo de errores
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode);
  //       console.log(errorMessage);
  //     });
  // };

  // Función para iniciar sesión con Facebook
  // const signInWithFacebook = () => {
  //   signInWithPopup(auth, facebookProvider)
  //   .then((userCredential) => {
  //     // Inicio de sesión exitoso con Google
  //     const user = userCredential.user;
  //     console.log(user);
  //     dispatch(setUser(user))
  //     dispatch(login())
  //     navigate("/store/all products")
  //     // Realiza acciones adicionales después del inicio de sesión
  //   })
  //   .catch((error) => {
  //     // Manejo de errores
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode);
  //     console.log(errorMessage);
  //   });
  // };

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
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Divider sx={{ mb: 5 }} />
{/* 
            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {""}
              <Link variant="subtitle2" onClick={() => navigate("/signUp")}>
                Get started
              </Link>
            </Typography> */}

            <Stack direction="row" spacing={2}>
              {/* <Button fullWidth size="large" color="inherit" variant="outlined" onClick={signInWithGoogle}>
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button> */}

              {/* <Button fullWidth size="large" color="inherit" variant="outlined" onClick={signInWithFacebook}>
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button> */}
            </Stack>
            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider> */}
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default LoginPage;
