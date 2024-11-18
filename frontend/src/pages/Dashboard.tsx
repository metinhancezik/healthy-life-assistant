import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom'; // Bu satırı ekleyin

const Dashboard = () => {
  const navigate = useNavigate(); // Bu satırı ekleyin

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Hoşgeldin Mesajı */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Hoş Geldiniz!
            </Typography>
            <Typography variant="body1">
              Sağlıklı yaşam asistanınız ile günlük aktivitelerinizi ve beslenmenizi takip edebilirsiniz.
            </Typography>
          </Paper>
        </Grid>

        {/* Aktiviteler Kartı */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DirectionsRunIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Aktiviteler</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Bugünkü aktivitelerinizi kaydedin ve takip edin.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 'auto' }}
              onClick={() => navigate('/exercise')} // Bu satırı ekleyin
            >
              Aktivite Ekle
            </Button>
          </Paper>
        </Grid>

        {/* Yemekler Kartı */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RestaurantIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Öğünler</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Günlük öğünlerinizi kaydedin ve kalori takibi yapın.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 'auto' }}
              onClick={() => navigate('/meal')} // Bu satırı ekleyin
            >
              Öğün Ekle
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;