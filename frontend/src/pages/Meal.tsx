import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../utils/axios';

interface MealData {
  meal_type: string;
  food_items: string[];
  calories: string;
  meal_date: string;
  notes: string;
}

const Meal = () => {
  const [meal, setMeal] = useState<MealData>({
    meal_type: '',
    food_items: [''],
    calories: '',
    meal_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meal.meal_type || !meal.calories || !meal.notes) {
      setSnackbar({
        open: true,
        message: 'Lütfen tüm alanları doldurun!',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/meals/meal-plan', {
        meal_type: meal.meal_type,
        food_items: meal.notes.split(',').map(item => item.trim()),
        calories: parseInt(meal.calories),
        meal_date: meal.meal_date
      });

      setSnackbar({
        open: true,
        message: 'Öğün başarıyla eklendi!',
        severity: 'success'
      });

      // Formu temizle
      setMeal({
        meal_type: '',
        food_items: [''],
        calories: '',
        meal_date: new Date().toISOString().split('T')[0],
        notes: '',
      });

    } catch (error: any) {
      console.error('Öğün ekleme hatası:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Öğün eklenirken bir hata oluştu!',
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Öğün Ekle
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Öğün Türü</InputLabel>
                <Select
                  value={meal.meal_type}
                  label="Öğün Türü"
                  onChange={(e) => setMeal(prev => ({ ...prev, meal_type: e.target.value }))}
                  disabled={loading}
                >
                  <MenuItem value="breakfast">Kahvaltı</MenuItem>
                  <MenuItem value="lunch">Öğle Yemeği</MenuItem>
                  <MenuItem value="dinner">Akşam Yemeği</MenuItem>
                  <MenuItem value="snack">Ara Öğün</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Kalori"
                value={meal.calories}
                onChange={(e) => setMeal(prev => ({ ...prev, calories: e.target.value }))}
                disabled={loading}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Tarih"
                value={meal.meal_date}
                onChange={(e) => setMeal(prev => ({ ...prev, meal_date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Yemekler (virgülle ayırın)"
                value={meal.notes}
                onChange={(e) => setMeal(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Örnek: yumurta, ekmek, peynir"
                disabled={loading}
                helperText="Her yemeği virgülle ayırarak yazın"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? 'Ekleniyor...' : 'Öğün Ekle'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

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

export default Meal;
