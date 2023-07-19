import { useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

//-------------------------------------------------------------------
import {
  Stack,
  TextField,
  Typography,
  Box,
  Alert,
  Button,
} from "@mui/material";

// ----------------------------------------------------------------------

function RecoverPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const auth = getAuth();

  const handleSubmit = (e) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    e.preventDefault();
    if (email.length === 0) {
      setError("Email is Required");
      return;
    } else if (!regExp.test(email)) {
      setError("Email is invalid format");
      return;
    }
    fetchSignInMethodsForEmail(auth, email).then((signInMethods) => {
      if (signInMethods.length === 0) {
        setError("The user is not registered");
      } else {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setSuccess("We have sent you a message to your email, check your inbox");
            setError('')
          })
          .catch((error) => {
            setError("Something went wrong with the shipment, try again");
          });
      }
    });
  };

  const handleOnchange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              name="email"
              autoComplete="user-name"
              label="Email address"
              onChange={(e) => handleOnchange(e)}
            />
          </Box>
          <Box>
            <Typography variant="caption">
              we will send a code to your email
            </Typography>
            <Button type="submit">send email</Button>
          </Box>
          {error && (
            <Alert sx={{ p: 5 }} severity="error">
              {error}
            </Alert>
          )}
          {success && (
            <Alert sx={{ p: 5 }} severity="success">
              {success}
            </Alert>
          )}
        </Stack>
      </form>
    </>
  );
}

export default RecoverPasswordForm;
