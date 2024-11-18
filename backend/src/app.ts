import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('DB Bağlantı hatası:', err);
  }
  console.log('PostgreSQL veritabanına başarıyla bağlandı');
  release();
});

// Routes
app.use('/api/users', userRoutes);

// Base endpoint
app.get('/', (req, res) => {
  res.send('Sağlıklı Yaşam Asistanı API');
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});