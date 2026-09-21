import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
  onSuccess?: (data: { username: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!emailOrUsername.trim()) {
      newErrors.email = 'Username or email is required';
    } else if (emailOrUsername.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername)) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (onSuccess) {
        onSuccess({ username: emailOrUsername });
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
      {/* Username / Email Input */}
      <TextField
        fullWidth
        placeholder="Username"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        sx={{
          mb: 2.2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '999px',
            bgcolor: '#ffffff',
            color: '#494d55',
            '& fieldset': { borderColor: '#dcdfe4' },
            '&:hover fieldset': { borderColor: '#b8bcc5' },
            '&.Mui-focused fieldset': { borderColor: '#191b1f', borderWidth: 1.5 },
            px: 2
          }
        }}
      />

      {/* Password Input */}
      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  sx={{ color: '#8d929c' }}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        sx={{
          mb: 1.2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '999px',
            bgcolor: '#ffffff',
            color: '#494d55',
            '& fieldset': { borderColor: '#dcdfe4' },
            '&:hover fieldset': { borderColor: '#b8bcc5' },
            '&.Mui-focused fieldset': { borderColor: '#191b1f', borderWidth: 1.5 },
            px: 2
          }
        }}
      />

      {/* Forgot Password Link */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Link
          href="#"
          underline="none"
          sx={{
            color: '#4d515a',
            fontSize: '0.85rem',
            fontWeight: 500,
            '&:hover': { color: '#111317' }
          }}
        >
          Forgot Password?
        </Link>
      </Box>

      {/* Login Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          borderRadius: '999px',
          py: 1.4,
          bgcolor: '#0a0d14',
          color: '#ffffff',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            bgcolor: '#222631',
            boxShadow: 'none'
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
};