import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
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
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import meditationIllustration from '../assets/meditation-illustration.svg';

// Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check whether valid Firebase credentials have been configured
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.apiKey !== '' &&
  !firebaseConfig.apiKey.includes('your_')
);

// Safely initialize Firebase without throwing uncaught exceptions on missing credentials
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error: unknown) {
    console.warn('Firebase initialization warning:', error);
  }
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'info' | 'warning' | 'error' | 'success'>('info');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [showDemoOption, setShowDemoOption] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    // If Firebase is configured with valid credentials, use live Firebase Google Sign-In
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const accessToken = await result.user.getIdToken();
        navigate('/dashboard', {
          state: {
            token: accessToken,
            user: {
              displayName: result.user.displayName || 'Google User',
              email: result.user.email || '',
              photoURL: result.user.photoURL || ''
            }
          }
        });
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Google Sign-In Error:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage(error.message || 'Google sign-in failed.');
        setSnackbarOpen(true);
      }
      return;
    }

    // If Firebase credentials are not in .env, display a helpful warning and show demo login option
    setShowDemoOption(true);
    setSnackbarSeverity('warning');
    setSnackbarMessage(
      'Firebase is not configured in .env. You can add your Firebase keys or click "Demo Google Login" below to test the token redirect.'
    );
    setSnackbarOpen(true);
  };

  const handleDemoGoogleLogin = () => {
    const demoToken = `eyJhbGciOiJSUzI1NiIsImtpZCI6ImRlbW8ta2V5In0.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGVtby1hcHAiLCJzdWIiOiIxMjM0NTY3ODkiLCJlbWFpbCI6ImRlbW8udXNlckBleGFtcGxlLmNvbSIsImF1ZCI6ImRlbW8tYXBwIiwiaWF0IjoxNzA4NTY3ODkwLCJleHAiOjE3MDg1NzE0OTB9.demo_access_token_signature_preview`;
    navigate('/dashboard', {
      state: {
        token: demoToken,
        user: {
          displayName: 'Demo Google User',
          email: 'demo.user@example.com',
          photoURL: ''
        }
      }
    });
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
    const standardToken = `token_form_${Date.now()}_${btoa(username)}`;
    navigate('/dashboard', {
      state: {
        token: standardToken,
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

          {/* Divider */}
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

          {/* Social Login Buttons */}
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

          {/* Demo Login Shortcut when Firebase credentials are not in .env */}
          {showDemoOption && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDemoGoogleLogin}
                sx={{
                  borderRadius: '999px',
                  borderColor: '#558b6e',
                  color: '#346d4c',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  '&:hover': {
                    borderColor: '#346d4c',
                    bgcolor: 'rgba(85, 139, 110, 0.08)'
                  }
                }}
              >
                Demo Google Login (Test accessToken)
              </Button>
            </Box>
          )}
        </Box>

        {/* Bottom Registration Link */}
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
        autoHideDuration={7000}
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