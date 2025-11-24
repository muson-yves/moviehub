import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  startTime?: number;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode
    }
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      statusCode: 404
    }
  });
};

export const requestLogger = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - (req.startTime || 0);
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Simple validation - you can use a library like joi for more complex validation
    next();
  };
};
