import dotenv from 'dotenv';
import express from 'express';
import indexRoutes from './routes/index.js';
import foodRoutes from './routes/Foodroutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) });

const app = express();
const allowedOrigins = [
  'https://mahendra-food-village-frontend.vercel.app'
  
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);
const PORT = process.env.PORT || 7000;
app.get('/', (req, res) => {
  res.send('welcome to the food app');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use('/', indexRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/auth', authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
      console.log(`Database connected`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
  });
