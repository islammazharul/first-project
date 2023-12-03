
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createStudentIntoDb = async (password: string, payload: TStudent) => {

    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, then use default password
    userData.password = password || (config.default_password as string)


    // set student role
    userData.role = 'student'


    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    if (!admissionSemester) {
        throw new Error("Admission semester not found")
    }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // set auto generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user(transaction-1)
    const createUser = await User.create([userData], {session}); /* built in static method */

    /* object ke array banate hole Object.keys(obj) dite hobe */
    if (!createUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }


        // set id, _id as user
        payload.id = createUser[0].id  /* embedding */
        payload.createUser = createUser[0]._id /* reference to the user */

        // create a student(transaction-2)
        const newStudent = await Student.create([payload], {session})
        if(!newStudent.length){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student") 
        }

        await session.commitTransaction()
        await session.endSession()

        return newStudent
    
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to create student')
    }

    
};


export const userServices = {
    createStudentIntoDb,
}