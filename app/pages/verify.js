"use client";

import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      // Call your backend API for verification
      const response = await axios.post("http://localhost:5000/api/verify", { otp });
      alert(response.data.message || "OTP Verified Successfully!");
      // Redirect to the success page or dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ padding: "20px" }}>
      <Typography variant="h5">Verify OTP</Typography>
      <TextField
        label="Enter OTP"
        variant="outlined"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </Box>
  );
}
