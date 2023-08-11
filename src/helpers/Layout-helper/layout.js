import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  }));
  
 export const StyledSection = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // boxShadow: "0px 0px 4px 0px #eceef1",
    backgroundColor: theme.palette.background.default,
  }));
  
 export const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 700,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));
  
