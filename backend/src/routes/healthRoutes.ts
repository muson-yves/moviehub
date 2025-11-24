import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
