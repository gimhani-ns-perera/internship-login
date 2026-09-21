import React from 'react';
import { Box, Button, Card, CardContent, Typography, Avatar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const displayName = user?.displayName || user?.email || 'Welcome Back!';
  const userEmail = user?.email || 'user@example.com';

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
        p: 3
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 4,
          borderRadius: 6,
          border: '1.5px solid #e0e6e2',
          textAlign: 'center',
          boxShadow: '0 20px 40px -15px rgba(20, 45, 30, 0.08)'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
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
            Login Successful!
          </Typography>

          <Typography variant="body2" sx={{ color: '#6e7178', mb: 3 }}>
            You have successfully authenticated into <strong style={{ color: '#16181d' }}>Tuga's App</strong>.
          </Typography>

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
              mb: 3.5,
              textAlign: 'left'
            }}
          >
            <Avatar
              src={user?.photoURL}
              sx={{ bgcolor: '#16181d', width: 44, height: 44, fontWeight: 700 }}
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
    </Box>
  );
};
