import express from "express";
import { studentRoutes } from "../modules/student/student.rout";
import { userRouter } from "../modules/user/user.rout";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";


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
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;