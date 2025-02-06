import React, { useState } from 'react';
import { UserDTO } from './dtos/UserDTO';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email format'),
  github: Yup.string().required('Github is required').matches(/^[a-zA-Z0-9-]+$/, 'Invalid github username'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must not exceed 12 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Repeat Password is required'),
});

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [githubAccount, setGithubAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'github') {
      setGithubAccount(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'repeatPassword') {
      setRepeatPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ email, github: githubAccount, password, repeatPassword });
      // Handle registration logic here
    } catch (err: any) {
      setError(err.errors[0]);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: "20px" }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          type="text"
          name="github"
          value={githubAccount}
          onChange={handleChange}
          label="Github Account"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={handleChange}
          label="Repeat Password"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
