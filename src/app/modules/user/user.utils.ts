import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudentId = await User.findOne({
        role: 'student'
    }, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean()

    return lastStudentId?.id ? lastStudentId.id.substring(6) : undefined
}

// year, semesterCode, 4 digit number, 2030 01 0000
export const generateStudentId = async (payload: TAcademicSemester) => {
    // first time 0000
    // 0001 => 1

    let currentId = (0).toString()  // 0000 by default

    const lastStudentId = await findLastStudentId();
    // 2030 01 0001
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
    const lastStudentYear = lastStudentId?.substring(0, 4)
    const currentSemesterCode = payload.code
    const currentYear = payload.year

    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6) // 0001
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId
}