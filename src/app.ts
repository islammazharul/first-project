/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.rout';
import { userRouter } from './app/modules/user/user.rout';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// Application route
app.use('/api/v1/students', studentRoutes);
app.use("/api/v1/users", userRouter)

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

app.use(globalErrorHandler)
app.use(notFound)

export default app;
