import { Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Our App!</h1>
      <Link href="/register">
        <Button variant="contained" color="primary">Register</Button>
      </Link>
    </div>
  );
}
