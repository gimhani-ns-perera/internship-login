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
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import studyIllustration from '../assets/study-illustration.svg';

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
              displayName: result.user.displayName || 'Google Scholar',
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

    // If Firebase credentials are not in .env, display helpful prompt and show demo option
    setShowDemoOption(true);
    setSnackbarSeverity('warning');
    setSnackbarMessage(
      'Firebase credentials not found in .env. Click "Demo Google Sign In" below to test the accessToken dashboard flow.'
    );
    setSnackbarOpen(true);
  };

  const handleDemoGoogleLogin = () => {
    const demoToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3R1ZHlmbG93LWFwcCIsInN1YiI6InN0dWR5LWZsb3ctdXNlci0xMDEiLCJhdWQiOiJzdHVkeWZsb3ctYXBwIiwiZW1haWwiOiJhbGV4LnN0dWRlbnRAdW5pdmVyc2l0eS5lZHUiLCJuYW1lIjoiQWxleCBKLiIsImlhdCI6MTcwODU2Nzg5MH0.demo_studyflow_access_token_signature_preview`;
    navigate('/dashboard', {
      state: {
        token: demoToken,
        user: {
          displayName: 'Alex Johnson',
          email: 'alex.student@university.edu',
          photoURL: ''
        }
      }
    });
  };

  const handleAppleLogin = () => {
    setSnackbarSeverity('info');
    setSnackbarMessage('Apple Student Sign-In is coming soon!');
    setSnackbarOpen(true);
  };

  const handleFacebookLogin = () => {
    setSnackbarSeverity('info');
    setSnackbarMessage('Facebook Sign-In is coming soon!');
    setSnackbarOpen(true);
  };

  const handleFormLoginSuccess = ({ username }: { username: string }) => {
    const studentName = username.includes('@') ? username.split('@')[0] : username;
    const standardToken = `studyflow_auth_${Date.now()}_${btoa(username)}`;
    navigate('/dashboard', {
      state: {
        token: standardToken,
        user: {
          displayName: studentName.charAt(0).toUpperCase() + studentName.slice(1),
          email: username.includes('@') ? username : `${username}@university.edu`
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
          py: { xs: 4, md: 6 }
        }}
      >
        {/* Brand Header */}
        <Box sx={{ width: '100%', maxWidth: 420, display: 'flex', alignItems: 'center', gap: 1.2, mb: { xs: 3, md: 0 } }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              bgcolor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb'
            }}
          >
            <AutoStoriesRoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                fontSize: '1.25rem',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              📚 StudyFlow
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>
              Student Learning Platform
            </Typography>
          </Box>
        </Box>

        {/* Main Form Container */}
        <Box sx={{ width: '100%', maxWidth: 420, my: 'auto', py: 2 }}>
          {/* Heading */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.85rem', sm: '2.25rem' },
              color: '#0f172a',
              letterSpacing: '-0.02em',
              mb: 1
            }}
          >
            Welcome back!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              mb: 4,
              fontSize: '0.95rem',
              lineHeight: 1.5
            }}
          >
            Continue your learning journey with{' '}
            <strong style={{ color: '#2563eb' }}>StudyFlow</strong>.
          </Typography>

          {/* LoginForm Component */}
          <LoginForm onSuccess={handleFormLoginSuccess} />

          {/* Divider */}
          <Divider
            sx={{
              my: 3.5,
              color: '#94a3b8',
              fontSize: '0.85rem',
              '&::before, &::after': { borderColor: '#e2e8f0' }
            }}
          >
            or continue with
          </Divider>

          {/* Prominent Google Sign In Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon sx={{ color: '#ea4335' }} />}
            sx={{
              borderRadius: '12px',
              py: 1.3,
              borderColor: '#e2e8f0',
              color: '#1e293b',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              bgcolor: '#ffffff',
              mb: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              '&:hover': {
                borderColor: '#cbd5e1',
                bgcolor: '#f8fafc'
              }
            }}
          >
            Continue with Google
          </Button>

          {/* Social Icons for Apple & Facebook */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              onClick={handleAppleLogin}
              aria-label="Login with Apple"
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                bgcolor: '#ffffff',
                color: '#0f172a',
                '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
              }}
            >
              <AppleIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleFacebookLogin}
              aria-label="Login with Facebook"
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                bgcolor: '#ffffff',
                color: '#1877f2',
                '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
              }}
            >
              <FacebookRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Demo Login Button when Firebase keys are not in .env */}
          {showDemoOption && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDemoGoogleLogin}
                sx={{
                  borderRadius: '999px',
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  bgcolor: '#eff6ff',
                  '&:hover': {
                    borderColor: '#1d4ed8',
                    bgcolor: '#dbeafe'
                  }
                }}
              >
                Demo Google Sign In (Test accessToken)
              </Button>
            </Box>
          )}
        </Box>

        {/* Bottom Registration Link */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
            Don't have an account?{' '}
            <Link
              href="#"
              underline="hover"
              sx={{
                color: '#2563eb',
                fontWeight: 700,
                '&:hover': { color: '#1d4ed8' }
              }}
            >
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Right Column: Academic Showcase Card */}
      <Box
        sx={{
          flex: 1.15,
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
            borderRadius: '28px',
            bgcolor: '#f0f7ff',
            border: '1.5px solid #e0e7ff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 5,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Top Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: '999px',
              bgcolor: '#ffffff',
              border: '1px solid #dbeafe',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)'
            }}
          >
            <SchoolRoundedIcon sx={{ fontSize: 16, color: '#2563eb' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e3a8a', letterSpacing: '0.02em' }}>
              ACADEMIC SUCCESS SUITE
            </Typography>
          </Box>

          {/* Main Visual Content */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 480,
              my: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Study / Student Hero Illustration */}
            <Box
              component="img"
              src={studyIllustration}
              alt="StudyFlow student studying with books and laptop"
              sx={{
                width: '95%',
                maxHeight: 380,
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 24px rgba(30, 58, 138, 0.06))'
              }}
            />

            {/* Floating Academic Progress Badge */}
            <Paper
              elevation={0}
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 10,
                border: '1.5px solid #cbd5e1',
                borderRadius: '16px',
                p: 2,
                width: 180,
                bgcolor: '#ffffff',
                boxShadow: '0 12px 30px -8px rgba(15, 23, 42, 0.12)'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                Study Schedule
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1.5, fontSize: '0.75rem' }}>
                10 Tasks Completed
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box
                  sx={{
                    borderRadius: '999px',
                    px: 1.5,
                    py: 0.3,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    bgcolor: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  Academic
                </Box>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '3px solid #2563eb',
                    borderTopColor: '#e0e7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#1d4ed8'
                  }}
                >
                  84%
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Carousel Indicator Dots */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
            <Box sx={{ width: 24, height: 8, borderRadius: 4, bgcolor: '#2563eb' }} />
          </Box>

          {/* Tagline & Promo Header Text */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                fontSize: { md: '1.35rem', lg: '1.5rem' },
                mb: 1
              }}
            >
              Organize your learning. <br />
              Achieve your goals with <strong style={{ color: '#2563eb' }}>StudyFlow</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
              Learn smarter, stay organized, and reach your goals.
            </Typography>
          </Box>
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