import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const Meal = () => {
  const [meal, setMeal] = useState({
    name: '',
    type: '',
    calories: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Öğün bilgileri:', meal);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Öğün Ekle
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Yemek Adı"
                value={meal.name}
                onChange={(e) => setMeal({ ...meal, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Öğün Türü</InputLabel>
                <Select
                  value={meal.type}
                  label="Öğün Türü"
                  onChange={(e) => setMeal({ ...meal, type: e.target.value })}
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
                type="number"
                label="Kalori"
                value={meal.calories}
                onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Tarih"
                value={meal.date}
                onChange={(e) => setMeal({ ...meal, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notlar"
                value={meal.notes}
                onChange={(e) => setMeal({ ...meal, notes: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Öğün Ekle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Meal;