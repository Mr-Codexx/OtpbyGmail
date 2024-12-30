import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // This is where you'd integrate your actual login logic
    alert('Login Successful!');
    router.push('/success');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ padding: '20px' }}>
      <Typography variant="h5">Login</Typography>
      <TextField 
        label="Email" 
        variant="outlined" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        fullWidth 
        style={{ marginBottom: '20px' }} 
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
}
