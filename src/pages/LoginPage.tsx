import React, { useState } from 'react';
import {
  Alert,
  Box,
  Divider,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Typography
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase';
import meditationIllustration from '../assets/meditation-illustration.svg';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'info' | 'warning' | 'error'>('info');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setSnackbarSeverity('warning');
      setSnackbarMessage(
        'Firebase credentials are not configured yet. Add your Firebase keys to .env to enable live Google sign-in.'
      );
      setSnackbarOpen(true);
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const accessToken = await result.user.getIdToken();
      navigate('/dashboard', {
        state: {
          token: accessToken,
          user: {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL
          }
        }
      });
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Google Sign-In Error:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message || 'Google sign-in failed');
      setSnackbarOpen(true);
    }
  };

  const handleAppleLogin = () => {
    setSnackbarSeverity('info');
    setSnackbarMessage('Apple Sign-In is coming soon!');
    setSnackbarOpen(true);
  };

  const handleFacebookLogin = () => {
    setSnackbarSeverity('info');
    setSnackbarMessage('Facebook Sign-In is coming soon!');
    setSnackbarOpen(true);
  };

  const handleFormLoginSuccess = ({ username }: { username: string }) => {
    navigate('/dashboard', {
      state: {
        user: {
          displayName: username.includes('@') ? username.split('@')[0] : username,
          email: username.includes('@') ? username : `${username}@example.com`
        }
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: '#ffffff'
      }}
    >
      {/* Left Column: Login Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 3, sm: 6, md: 8, lg: 12 },
          py: { xs: 5, md: 6 }
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420, my: 'auto' }}>
          {/* Heading */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: '#0e1013',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              mb: 1.5
            }}
          >
            Welcome back!
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#6e7178',
              textAlign: 'center',
              mb: 4.5,
              lineHeight: 1.5
            }}
          >
            Simplify your workflow and boost your productivity with{' '}
            <strong style={{ color: '#1b1d21' }}>Tuga's App</strong>. Get started for free.
          </Typography>

          {/* LoginForm Component */}
          <LoginForm onSuccess={handleFormLoginSuccess} />

          {/* Other Element: Divider */}
          <Divider
            sx={{
              my: 4,
              color: '#6f747e',
              fontSize: '0.85rem',
              '&::before, &::after': { borderColor: '#e3e6eb' }
            }}
          >
            or continue with
          </Divider>

          {/* Other Element: Social Login Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.2 }}>
            <IconButton
              onClick={handleGoogleLogin}
              aria-label="Login with Google"
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#0a0d14',
                color: '#ffffff',
                '&:hover': { bgcolor: '#222631' }
              }}
            >
              <GoogleIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleAppleLogin}
              aria-label="Login with Apple"
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#0a0d14',
                color: '#ffffff',
                '&:hover': { bgcolor: '#222631' }
              }}
            >
              <AppleIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleFacebookLogin}
              aria-label="Login with Facebook"
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#0a0d14',
                color: '#ffffff',
                '&:hover': { bgcolor: '#222631' }
              }}
            >
              <FacebookRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Other Element: Bottom Registration Link */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#4a4e58', fontWeight: 500 }}>
            Not a member?{' '}
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#558b6e',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Right Column: Hero Card Showcase */}
      <Box
        sx={{
          flex: 1.1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { md: 4, lg: 6 }
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: 780,
            borderRadius: 7,
            bgcolor: '#f5faf6',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 5,
            position: 'relative'
          }}
        >
          {/* Main Visual Content */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 460,
              my: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Meditating Hero / Workflow Image */}
            <Box
              component="img"
              src={meditationIllustration}
              alt="Workflow illustration"
              sx={{
                width: '90%',
                maxHeight: 380,
                objectFit: 'contain'
              }}
            />

            {/* Floating Canva Design Badge */}
            <Paper
              elevation={0}
              sx={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                border: '1.5px solid #22252a',
                borderRadius: 4,
                p: 2,
                width: 170,
                bgcolor: '#ffffff',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#16181d' }}>
                Canva Design
              </Typography>
              <Typography variant="caption" sx={{ color: '#888d96', display: 'block', mb: 1.5 }}>
                10 Task
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box
                  sx={{
                    border: '1.5px solid #22252a',
                    borderRadius: '999px',
                    px: 1.5,
                    py: 0.2,
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  Design
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '3px solid #6ebd85',
                    borderTopColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700
                  }}
                >
                  84%
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Carousel Indicator Dots */}
          <Box sx={{ display: 'flex', gap: 0.8, mb: 3 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d3dad5' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d3dad5' }} />
            <Box sx={{ width: 22, height: 8, borderRadius: 4, bgcolor: '#121417' }} />
          </Box>

          {/* Promo Header Text */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#1a1d22',
              textAlign: 'center',
              letterSpacing: '-0.01em',
              mb: 1
            }}
          >
            Make your work easier and organized <br />
            with <strong style={{ color: '#090a0c' }}>Tuga's App</strong>
          </Typography>
        </Box>
      </Box>

      {/* Snackbar notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};