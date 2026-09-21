import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Paper,
  Tooltip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyIcon from '@mui/icons-material/Key';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';

export function TokenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const token = location.state?.token || 'No access token available. Please log in again.';

  const [copied, setCopied] = useState(false);

  const displayName = user?.displayName || user?.email || 'StudyFlow Scholar';
  const userEmail = user?.email || 'student@university.edu';

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
    }
  };

  const handleLogout = () => {
    navigate('/');
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
        p: { xs: 2, sm: 4 }
      }}
    >
      {/* Ambient Blurred Background Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '-8%',
          left: '-5%',
          width: { xs: 250, md: 400 },
          height: { xs: 250, md: 400 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: { xs: 280, md: 450 },
          height: { xs: 280, md: 450 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0) 70%)',
          filter: 'blur(65px)',
          pointerEvents: 'none'
        }}
      />

      <Card
        elevation={0}
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 680,
          width: '100%',
          p: { xs: 3, sm: 4.5 },
          borderRadius: { xs: '20px', sm: '28px' },
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          textAlign: 'center',
          boxShadow: '0 25px 60px -15px rgba(30, 58, 138, 0.12), 0 10px 25px -5px rgba(124, 58, 237, 0.06)'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
          {/* StudyFlow Portal Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.6,
              borderRadius: '999px',
              bgcolor: '#eff6ff',
              border: '1px solid #bfdbfe',
              mb: 2.5
            }}
          >
            <AutoStoriesRoundedIcon sx={{ fontSize: 18, color: '#2563eb' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e3a8a' }}>
              📚 StudyFlow Portal
            </Typography>
          </Box>

          {/* Green Checkmark Success Status */}
          <Box
            sx={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              bgcolor: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <CheckCircleOutlineRoundedIcon sx={{ fontSize: 40, color: '#16a34a' }} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, letterSpacing: '-0.02em' }}>
            Authentication Successful
          </Typography>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
            Welcome back to your <strong style={{ color: '#2563eb' }}>StudyFlow</strong> learning dashboard.
          </Typography>

          {/* User Profile Card */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              width: '100%',
              bgcolor: '#f8fafc',
              borderRadius: 4,
              border: '1px solid #e2e8f0',
              mb: 3,
              textAlign: 'left'
            }}
          >
            <Avatar
              src={user?.photoURL}
              sx={{ bgcolor: '#2563eb', width: 48, height: 48, fontWeight: 700 }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }} noWrap>
                {displayName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }} noWrap>
                {userEmail}
              </Typography>
            </Box>
          </Box>

          {/* User Access Token Box */}
          <Box sx={{ width: '100%', textAlign: 'left', mb: 3.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <KeyIcon sx={{ fontSize: 18, color: '#2563eb' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  User Access Token (accessToken)
                </Typography>
              </Box>
              <Tooltip title="Copy Token">
                <IconButton size="small" onClick={handleCopyToken} sx={{ color: '#64748b' }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: '#0f172a',
                borderRadius: 3,
                border: '1px solid #334155',
                overflowX: 'auto',
                maxHeight: 160
              }}
            >
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.78rem',
                  color: '#93c5fd',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  userSelect: 'all'
                }}
              >
                {token}
              </Typography>
            </Paper>
          </Box>

          {/* Log Out Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
            sx={{
              borderRadius: '12px',
              py: 1.4,
              bgcolor: '#2563eb',
              color: '#ffffff',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              '&:hover': {
                bgcolor: '#1d4ed8',
                boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)'
              }
            }}
          >
            Log Out
          </Button>
        </CardContent>
      </Card>

      {/* Copy Notification */}
      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          AccessToken copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}