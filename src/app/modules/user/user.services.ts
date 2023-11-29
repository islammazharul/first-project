
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


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

    // set auto generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user
    const createUser = await User.create(userData); /* built in static method */

    /* object ke array banate hole Object.keys(obj) dite hobe */
    if (Object.keys(createUser).length) {
        // set id, _id as user
        payload.id = createUser.id  /* embedding */
        payload.createUser = createUser._id /* reference to the user */

        // create a student
        const newStudent = await Student.create(payload)
        return newStudent
    }
};


export const userServices = {
    createStudentIntoDb,
}