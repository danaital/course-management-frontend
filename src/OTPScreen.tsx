import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification logic here
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    // Proceed with OTP verification
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          label="OTP"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Verify OTP
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

