import express from 'express';
import cityRoutes from './routes/cityRoutes.js';

const app = express();
app.use(express.json());

// Routes
app.use('/cities', cityRoutes);

export default app;