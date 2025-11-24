import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import { errorHandler, notFoundHandler, requestLogger } from './middleware/errorHandler.js';
import movieRoutes from './routes/movieRoutes.js';
import seasonRoutes from './routes/seasonRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logger
app.use(requestLogger);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/seasons', seasonRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    console.log('Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`🎬 MovieHub API server running on http://localhost:${PORT}`);
      console.log(`Frontend URL: ${FRONTEND_URL}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
