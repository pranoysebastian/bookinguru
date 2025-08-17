import express from 'express';
import authMiddleware from "../middlewares/authMiddleware.js";
import { getCities } from '../controllers/cityController.js';

const router = express.Router();

router.get('/', authMiddleware, getCities);

export default router;