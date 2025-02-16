import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Lỗi server';

  res.status(status).json({
    data: {},
    message: message,
    error: error.error || null
  });
}; 