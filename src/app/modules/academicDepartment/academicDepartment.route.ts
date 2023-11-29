import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';



const router = express.Router();

// will call controller func

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment)

router.get('/', AcademicDepartmentController.getAllAcademicDepartment)

router.get('/:DepartmentId', AcademicDepartmentController.getSingleAcademicDepartment)

router.patch('/:DepartmentId', validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema), AcademicDepartmentController.updateSingleAcademicDepartment)

export const AcademicDepartmentRoutes = router;