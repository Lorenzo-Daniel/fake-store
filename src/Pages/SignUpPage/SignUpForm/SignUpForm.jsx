import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

function SignUpForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/store/all products');
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="firsName" label="Name" />
        <TextField name="lastName" label="Last Name" />
        <TextField type='email' name="email" label="Email address" />
        <TextField name="phone" label="Phone" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {/* <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Button fullWidth size="large" type="submit" variant="outlined" sx={{mt:4}} onClick={handleClick}>
        Login
      </Button>
    </>
  );
}

export default SignUpForm;