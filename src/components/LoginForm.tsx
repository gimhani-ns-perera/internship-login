import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LoginFormProps {
  onSuccess?: (data: { username: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
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
        onSuccess({ username: email });
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
      {/* Email Label & Input */}
      <Box sx={{ mb: 2.2 }}>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            fontWeight: 600,
            color: '#334155',
            mb: 0.8,
            fontSize: '0.875rem'
          }}
        >
          Email
        </Typography>
        <TextField
          fullWidth
          placeholder="name@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineRoundedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                </InputAdornment>
              )
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              bgcolor: '#ffffff',
              color: '#0f172a',
              '& fieldset': { borderColor: '#e2e8f0', borderWidth: 1.5 },
              '&:hover fieldset': { borderColor: '#cbd5e1' },
              '&.Mui-focused fieldset': { borderColor: '#2563eb', borderWidth: 2 },
              px: 1.5
            }
          }}
        />
      </Box>

      {/* Password Label & Input */}
      <Box sx={{ mb: 1.2 }}>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            fontWeight: 600,
            color: '#334155',
            mb: 0.8,
            fontSize: '0.875rem'
          }}
        >
          Password
        </Typography>
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: '#94a3b8' }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              bgcolor: '#ffffff',
              color: '#0f172a',
              '& fieldset': { borderColor: '#e2e8f0', borderWidth: 1.5 },
              '&:hover fieldset': { borderColor: '#cbd5e1' },
              '&.Mui-focused fieldset': { borderColor: '#2563eb', borderWidth: 2 },
              px: 1.5
            }
          }}
        />
      </Box>

      {/* Forgot Password Link */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Link
          href="#"
          underline="hover"
          sx={{
            color: '#2563eb',
            fontSize: '0.875rem',
            fontWeight: 600,
            '&:hover': { color: '#1d4ed8' }
          }}
        >
          Forgot Password?
        </Link>
      </Box>

      {/* Sign In Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          borderRadius: '12px',
          py: 1.4,
          bgcolor: '#2563eb',
          color: '#ffffff',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: '#1d4ed8',
            boxShadow: '0 6px 20px 0 rgba(37, 99, 235, 0.4)'
          }
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};