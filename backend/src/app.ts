import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Pool, PoolClient } from 'pg';
import pool from './config/db';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import healthRoutes from './routes/healthRoutes';
import mealRoutes from './routes/mealRoutes';
import authRoutes from './routes/authRoutes';  // Auth route'ları ekleyin

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
pool.connect((err: Error | undefined, client: PoolClient | undefined, done: (release?: any) => void) => {
  if (err) {
    return console.error('DB Bağlantı hatası:', err);
  }
  console.log('PostgreSQL veritabanına başarıyla bağlandı');
  done();
});

// Routes
app.use('/api/auth', authRoutes);  // Auth route'larını ekleyin
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/meals', mealRoutes);

// Base endpoint
app.get('/', (req, res) => {
  res.send('Sağlıklı Yaşam Asistanı API');
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Sunucu hatası!' });
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});

export default app;