'use client';
import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Verify = dynamic(() => import('./Verify'), { ssr: false });

export default function Page() {
  return <Verify />;
}
