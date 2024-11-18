import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const History = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Örnek veri
  const activities = [
    { date: '2024-01-20', type: 'Koşu', duration: '30', caloriesBurned: '300' },
    { date: '2024-01-19', type: 'Yüzme', duration: '45', caloriesBurned: '400' },
  ];

  const meals = [
    { date: '2024-01-20', name: 'Kahvaltı', type: 'breakfast', calories: '400' },
    { date: '2024-01-20', name: 'Öğle Yemeği', type: 'lunch', calories: '600' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Aktiviteler" />
            <Tab label="Öğünler" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tarih</TableCell>
                  <TableCell>Aktivite Türü</TableCell>
                  <TableCell>Süre (dk)</TableCell>
                  <TableCell>Yakılan Kalori</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.duration}</TableCell>
                    <TableCell>{activity.caloriesBurned}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tarih</TableCell>
                  <TableCell>Yemek Adı</TableCell>
                  <TableCell>Öğün</TableCell>
                  <TableCell>Kalori</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((meal, index) => (
                  <TableRow key={index}>
                    <TableCell>{meal.date}</TableCell>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell>{meal.type}</TableCell>
                    <TableCell>{meal.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default History;