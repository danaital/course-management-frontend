import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDTO } from './dtos/UserDTO';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').email('Invalid email format'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const Login: React.FC = () => {
  const [user, setUser] = useState<UserDTO>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>('email');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(user);
      // Handle login logic here
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err: any) {
      setError(err.errors[0]);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Account Type</FormLabel>
          <RadioGroup row value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="github" control={<Radio />} label="GitHub Account" />
          </RadioGroup>
        </FormControl>
        <TextField
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          label={accountType === 'email' ? 'Email' : 'GitHub Account'}
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={user.password}
          onChange={handleChange}
          label="Password"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: '16px' }}
          InputProps={{
            endAdornment: (
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
          label="Remember Me"
          style={{ marginBottom: '16px' }}
        />
        <Button type="button" style={{marginBottom: "16px" }} onClick={() => navigate('/forgot-password')} variant="text" color="primary">
          Forgot Password?
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
