import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import employeeRoutes from './routes/employeeRoutes';
import timeOffRoutes from './routes/timeOffRoutes';
import areaRoutes from './routes/areaRoutes';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/time-off', timeOffRoutes);
app.use('/api/areas', areaRoutes);

// Simple error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
