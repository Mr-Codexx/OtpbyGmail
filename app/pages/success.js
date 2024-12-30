import { Typography, Box } from '@mui/material';

export default function Success() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ padding: '20px' }}>
      <Typography variant="h5">Login Successful!</Typography>
      <Typography variant="body1">You have successfully logged in.</Typography>
    </Box>
  );
}
