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

const Exercise = () => {
  const [activity, setActivity] = useState({
    type: '',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Aktivite bilgileri:', activity);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Aktivite Ekle
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Aktivite Türü</InputLabel>
                <Select
                  value={activity.type}
                  label="Aktivite Türü"
                  onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                >
                  <MenuItem value="walking">Yürüyüş</MenuItem>
                  <MenuItem value="running">Koşu</MenuItem>
                  <MenuItem value="cycling">Bisiklet</MenuItem>
                  <MenuItem value="swimming">Yüzme</MenuItem>
                  <MenuItem value="gym">Spor Salonu</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Süre (dakika)"
                value={activity.duration}
                onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Yakılan Kalori"
                value={activity.caloriesBurned}
                onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Tarih"
                value={activity.date}
                onChange={(e) => setActivity({ ...activity, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notlar"
                value={activity.notes}
                onChange={(e) => setActivity({ ...activity, notes: e.target.value })}
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
                Aktivite Ekle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Exercise;