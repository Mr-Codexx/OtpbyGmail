const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for OTPs and tokens
const store = {};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route: Send OTP and email verification link
app.post('/api/register', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  const otp = crypto.randomInt(100000, 999999).toString();
  const token = crypto.randomBytes(32).toString('hex');
  store[email] = { otp, token };

  const verificationLink = `http://localhost:3000/verify?email=${email}&token=${token}`;
  const emailContent = `
    <h1>Verify Your Email</h1>
    <p>Your OTP is <b>${otp}</b></p>
    <p>Or click the link below to verify your email:</p>
    <a href="${verificationLink}">Verify Email</a>
  `;

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: emailContent,
  }, (error, info) => {
    if (error) return res.status(500).send('Failed to send email');
    res.status(200).send('OTP and verification link sent');
  });
});

// Route: Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const data = store[email];
  if (!data || data.otp !== otp) return res.status(400).send('Invalid OTP');
  delete store[email];
  res.status(200).send('OTP Verified');
});

// Route: Verify email link
app.post('/api/verify-link', (req, res) => {
  const { email, token } = req.body;
  const data = store[email];
  if (!data || data.token !== token) return res.status(400).send('Invalid or expired link');
  delete store[email];
  res.status(200).send('Email Verified');
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
