import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = (location.state as any)?.from || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Form submit'i engelle
    setLoading(true);
    setError('');

    try {
      console.log('Login isteği gönderiliyor:', formData);

      const response = await api.post('/auth/login', formData);
      
      console.log('Sunucu yanıtı:', response.data);

      if (response.data && response.data.token) {
        // AuthContext'e login bilgilerini kaydet
        login(response.data.token, response.data.user);
        
        setShowSuccess(true);
        
        // Kısa bir gecikme ile yönlendirme yap
        setTimeout(() => {
          navigate(from);
        }, 1500);
      } else {
        setError('Giriş başarısız: Sunucudan token alınamadı');
      }
    } catch (error: any) {
      console.error('Login hatası:', error);
      console.error('Hata detayları:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      // Daha detaylı hata mesajları
      if (error.response?.status === 401) {
        setError('Email veya şifre hatalı');
      } else if (error.response?.status === 404) {
        setError('Kullanıcı bulunamadı');
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
            Giriş Yap
          </Typography>
          
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-posta"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Şifre"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" component="span">
                Hesabınız yok mu?{' '}
              </Typography>
              <MuiLink 
                href="/register"
                variant="body2"
                sx={{ fontWeight: 'bold' }}
              >
                Kayıt Olun
              </MuiLink>
            </Box>
          </form>
        </Paper>
      </Box>

      {/* Hata Bildirimi */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setError('')} 
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Başarı Bildirimi */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
        >
          Giriş başarılı! Yönlendiriliyorsunuz...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;