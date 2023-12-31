import { academicSemesterNameCodeMapper } from "./academicSemester.constant"
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"


const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {

    // academicSemesterNameCodeMapper["Fall"]
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code")
    }

    const result = await AcademicSemester.create(payload)
    return result

}

const getAllAcademicSemesterFromDb = async () => {
    const result = await AcademicSemester.find()
    return result
}

const getSingleAcademicSemesterFromDb = async (id: string) => {
    const result = await AcademicSemester.findOne({ id })
    return result
}

const updateSingleAcademicSemesterIntoDb = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (
        payload.name && payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error("Invalid semester code")
    }
    const result = await AcademicSemester.findOneAndUpdate({
        _id: id

    }, payload, { new: true, })
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDb,
    getSingleAcademicSemesterFromDb,
    updateSingleAcademicSemesterIntoDb
}