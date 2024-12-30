"use client";

import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation"; // Use next/navigation for the app directory

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/register", { email });
      alert(response.data.message || "OTP Sent to your email");
      router.push("/verify"); // Navigate to the verify page
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ padding: "20px" }}>
      <Typography variant="h5">Register</Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send OTP"}
      </Button>
    </Box>
  );
}
