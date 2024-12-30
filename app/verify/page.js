'use client';
import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      alert('OTP Verified!');
      router.push('/success');
    } catch (error) {
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  const handleVerifyLink = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/verify-link', { email, token });
      alert('Email Verified!');
      router.push('/success');
    } catch (error) {
      alert('Invalid or expired link');
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ padding: '20px' }}>
      <Typography variant="h5">Verify Your Email</Typography>
      {token ? (
        <Button variant="contained" color="primary" onClick={handleVerifyLink} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Email'}
        </Button>
      ) : (
        <>
          <TextField
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleVerifyOTP} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </>
      )}
    </Box>
  );
}
