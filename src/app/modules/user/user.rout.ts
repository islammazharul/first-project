import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();



router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), userController.createStudent)

export const userRouter = router