import express from "express";
import { studentRoutes } from "../modules/student/student.rout";
import { userRouter } from "../modules/user/user.rout";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";


const router = express.Router()
const moduleRoutes = [
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/students',
        route: studentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;