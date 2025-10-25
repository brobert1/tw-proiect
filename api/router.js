import { Router } from 'express';
import { errorHandler, notFound } from './middleware';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0'
  });
});

// 404 handler
router.all('*', notFound);

// Error handler
router.use(errorHandler);

export default router;
