import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
// import { MulterError } from 'multer';
import { ErrorHandler } from '../handler-exceptions/error-handler';
import { HttpStatus } from '../utils/enums/http-status.enum';

export function validator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = HttpStatus.BAD_REQUEST;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(statusCode)
      .json({ errors: errors.array(), statusCode });
  }
  next();
}

export function errorHandler(
  error: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const errorDto = {
    message: 'Internal server error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
  if (error.name === 'Error') {
    if (!error.message) {
      return res.status(errorDto.statusCode).json(errorDto);
    }
    errorDto.message = error.message;
    return res.status(errorDto.statusCode).json(errorDto);
  }
  errorDto.message = error.message;
  errorDto.statusCode = error.statusCode;
  return res.status(error.statusCode).json(errorDto);
}