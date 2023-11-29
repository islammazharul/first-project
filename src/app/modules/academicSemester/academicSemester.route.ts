import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';


const router = express.Router();

// will call controller func

router.post('/create-academic-semesters', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)

router.get('/', AcademicSemesterController.getAllAcademicSemester)

router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester)

router.patch('/:semesterId', validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema), AcademicSemesterController.updateSingleAcademicSemester)

export const AcademicSemesterRoutes = router;