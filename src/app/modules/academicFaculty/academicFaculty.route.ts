import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';



const router = express.Router();

// will call controller func

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidations.createAcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty)

router.get('/', AcademicFacultyController.getAllAcademicFaculty)

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)

router.patch('/:facultyId', validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateSingleAcademicFaculty)

export const AcademicFacultyRoutes = router;