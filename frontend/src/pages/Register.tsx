import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Lütfen tüm alanları doldurun',
        severity: 'error'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Şifreler eşleşmiyor',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setSnackbar({
        open: true,
        message: 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...',
        severity: 'success'
      });

      // 2 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Kayıt başarılı! Lütfen giriş yapın.' }
        });
      }, 2000);

    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Kayıt olurken bir hata oluştu',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Kayıt Ol
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Kullanıcı Adı"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={loading}
              error={!formData.username && formData.username !== ''}
              helperText={!formData.username && formData.username !== '' ? 'Kullanıcı adı gerekli' : ''}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-posta"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
              error={!formData.email && formData.email !== ''}
              helperText={!formData.email && formData.email !== '' ? 'E-posta gerekli' : ''}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Şifre"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={loading}
              error={!formData.password && formData.password !== ''}
              helperText={!formData.password && formData.password !== '' ? 'Şifre gerekli' : ''}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Şifre Tekrar"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={loading}
              error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
              helperText={formData.password !== formData.confirmPassword && formData.confirmPassword !== '' ? 'Şifreler eşleşmiyor' : ''}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Kayıt Ol'
              )}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Zaten hesabınız var mı? Giriş yapın
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;