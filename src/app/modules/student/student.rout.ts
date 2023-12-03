import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.zod';

const router = express.Router();

// will call controller func


router.get('/', studentController.getAllStudents);

router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), studentController.updateStudent);
router.get('/:studentId', studentController.getSingleStudent);

router.delete('/:studentId', studentController.deleteStudent);

export const studentRoutes = router;
