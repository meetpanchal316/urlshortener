import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import urlRoutes from './routes/url.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', urlRoutes);
app.use('/', urlRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log('Backend running on port ' + PORT);
});