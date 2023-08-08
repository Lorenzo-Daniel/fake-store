import useResponsive from "../../hooks/useResponsive";

//-------------------------------------------------------------------

import {
  Container,
  Typography,
  Divider,
} from "@mui/material";

// ----------------------------------------------------------------------

import {StyledRoot,StyledSection,StyledContent} from '../../helpers/Layout-helper/layout'

//----------------------------------------------------------------------

function Error404() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img
              src="/assets/illustrations/illustration_error404.svg"
              alt="error-404"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
           <StyledSection sx={{mb:3, display:{sm:'block',md:'none'}}}>
            <img
              src="/assets/illustrations/illustration_error404.svg"
              alt="error-404"
            />
          </StyledSection>
            <Typography variant="h4" gutterBottom>
              Oops! Error 404 !! 
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <Typography variant="h6" gutterBottom>
              The page does not exist or access has been restricted because your user is not authenticated
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}



export default Error404
