import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import '@shared/infra/typeorm';
import 'reflect-metadata';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.path));
app.use(routes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, next: NextFunction)=> {
  if( err instanceof AppError){
    return response.status(err.statusCode).json({status: "error", message: err.message});
  }

  return response.status(500).json({status: "error", message:err.message});
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
})
