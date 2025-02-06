import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [githubAccount, setGithubAccount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    // Navigate to OTP screen
    navigate('/otp');
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center'}}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          type="text"
          name="githubAccount"
          value={githubAccount}
          onChange={(e) => setGithubAccount(e.target.value)}
          label="GitHub Account"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send OTP
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
