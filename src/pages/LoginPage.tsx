import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Snackbar,
  Typography
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import studyIllustration from '../assets/study-illustration.svg';

// Firebase configuration from Vite environment variables (.env)
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

// Safely initialize Firebase with configured credentials
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
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 50%, #fdf4ff 100%)',
        p: { xs: 2, sm: 3, md: 4 }
      }}
    >
      {/* Ambient Blurred Background Shapes (Option 2 — Color + Subtle Shapes) */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: { xs: 280, md: 450 },
          height: { xs: 280, md: 450 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-12%',
          right: '-8%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(59, 130, 246, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '18%',
          width: { xs: 200, md: 340 },
          height: { xs: 200, md: 340 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.22) 0%, rgba(192, 132, 252, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '12%',
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(96, 165, 250, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Elevated Glassmorphic Card Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1100,
          borderRadius: { xs: '20px', sm: '28px', md: '36px' },
          bgcolor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 25px 60px -15px rgba(30, 58, 138, 0.12), 0 10px 25px -5px rgba(124, 58, 237, 0.06)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden'
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
            px: { xs: 3, sm: 6, md: 7, lg: 8 },
            py: { xs: 4, sm: 5, md: 5 }
          }}
        >
          {/* Brand Header */}
          <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', alignItems: 'center', gap: 1.2, mb: { xs: 3, md: 0 } }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                bgcolor: '#eff6ff',
                border: '1px solid #dbeafe',
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
                Organize your learning. Achieve your goals.
              </Typography>
            </Box>
          </Box>

          {/* Main Form Container */}
          <Box sx={{ width: '100%', maxWidth: 400, my: 'auto', py: { xs: 1, md: 2 } }}>
            {/* Welcome Heading */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.15rem' },
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
                mb: 3.5,
                fontSize: '0.925rem',
                lineHeight: 1.5
              }}
            >
              Continue your learning journey.
            </Typography>

            {/* LoginForm Component */}
            <LoginForm onSuccess={handleFormLoginSuccess} />

            {/* Divider */}
            <Divider
              sx={{
                my: 3,
                color: '#94a3b8',
                fontSize: '0.85rem',
                '&::before, &::after': { borderColor: '#e2e8f0' }
              }}
            >
              or continue with
            </Divider>

            {/* Continue with Google Button */}
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
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc'
                }
              }}
            >
              Continue with Google
            </Button>

            {/* Demo Login Button when Firebase keys are not in .env */}
            {showDemoOption && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
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
          <Box sx={{ mt: { xs: 2, md: 3 } }}>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            p: { md: 4, lg: 5 },
            m: { md: 2 },
            borderRadius: '28px',
            bgcolor: 'rgba(240, 247, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(224, 231, 255, 0.9)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Academic Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.7,
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

          {/* Main Visual Content: Books / Studying Illustration */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 440,
              my: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={studyIllustration}
              alt="Books and student studying illustration"
              sx={{
                width: '95%',
                maxHeight: 360,
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 24px rgba(30, 58, 138, 0.08))'
              }}
            />
          </Box>

          {/* Tagline & Small Text */}
          <Box sx={{ textAlign: 'center', maxWidth: 440, mb: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                fontSize: { md: '1.3rem', lg: '1.45rem' },
                mb: 0.8
              }}
            >
              Organize your learning. Achieve your goals.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                fontSize: '0.925rem',
                lineHeight: 1.55
              }}
            >
              Learn smarter, stay organized, and reach your goals with <strong>StudyFlow</strong>.
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