import React, { useState } from 'react';
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

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const token = location.state?.token || 'No access token available. Please log in again.';

  const [copied, setCopied] = useState(false);

  const displayName = user?.displayName || user?.email || 'Authenticated User';
  const userEmail = user?.email || 'user@example.com';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5faf6',
        p: { xs: 2, sm: 4 }
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 680,
          width: '100%',
          p: { xs: 3, sm: 4.5 },
          borderRadius: 6,
          border: '1.5px solid #e0e6e2',
          textAlign: 'center',
          boxShadow: '0 20px 40px -15px rgba(20, 45, 30, 0.08)'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
          {/* Status Badge */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: '#e8f6ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2.5
            }}
          >
            <CheckCircleOutlineRoundedIcon sx={{ fontSize: 44, color: '#55a574' }} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, color: '#16181d', mb: 1 }}>
            Authentication Successful
          </Typography>

          <Typography variant="body2" sx={{ color: '#6e7178', mb: 3 }}>
            You have authenticated into <strong style={{ color: '#16181d' }}>Tuga's App</strong>.
          </Typography>

          {/* User Profile Card */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              width: '100%',
              bgcolor: '#f9fbf9',
              borderRadius: 4,
              border: '1px solid #eef2ef',
              mb: 3,
              textAlign: 'left'
            }}
          >
            <Avatar
              src={user?.photoURL}
              sx={{ bgcolor: '#16181d', width: 48, height: 48, fontWeight: 700 }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#16181d' }} noWrap>
                {displayName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#888d96' }} noWrap>
                {userEmail}
              </Typography>
            </Box>
          </Box>

          {/* Access Token Display (Required by Assessment Challenge) */}
          <Box sx={{ width: '100%', textAlign: 'left', mb: 3.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <KeyIcon sx={{ fontSize: 18, color: '#55a574' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1c2024' }}>
                  User Access Token (accessToken)
                </Typography>
              </Box>
              <Tooltip title="Copy Token">
                <IconButton size="small" onClick={handleCopyToken} sx={{ color: '#4d515a' }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: '#0f1318',
                borderRadius: 3,
                border: '1px solid #29303d',
                overflowX: 'auto',
                maxHeight: 160
              }}
            >
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.78rem',
                  color: '#98dfb0',
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

          {/* Logout Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
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
            Log Out
          </Button>
        </CardContent>
      </Card>

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
};
