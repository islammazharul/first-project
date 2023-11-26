
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDb = async (password: string, studentData: TStudent) => {

    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, then use default password
    userData.password = password || (config.default_password as string)


    // if (!password) {
    //     password = config.default_password as string
    // }else{
    //     user.password = password
    // }

    // set student role
    userData.role = 'student'

    // set manually generated id
    userData.id = '20301022'

    // create a user
    const createUser = await User.create(userData); /* built in static method */

    /* object ke array banate hole Object.keys(obj) dite hobe */
    if (Object.keys(createUser).length) {
        // set id, _id as user
        studentData.id = createUser.id  /* embedding */
        studentData.createUser = createUser._id /* reference to the user */

        // create a student
        const newStudent = await Student.create(studentData)
        return newStudent
    }
};


export const userServices = {
    createStudentIntoDb,
}