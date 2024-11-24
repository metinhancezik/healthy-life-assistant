import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box, useTheme } from '@mui/material';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={theme.palette.background.default}
      >
        <CircularProgress 
          size={40}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa, geldiği sayfayı state'e kaydedip login'e yönlendir
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Kullanıcı giriş yapmışsa, children'ı render et
  return <>{children}</>;
};

export default PrivateRoute;