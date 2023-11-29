import { TAcademicFaculty } from "./academicFaculty.interface"
import { AcademicFaculty } from "./academicFaculty.model"



const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {

    const result = await AcademicFaculty.create(payload)
    return result

}

const getAllAcademicFacultiesFromDb = async () => {
    const result = await AcademicFaculty.find()
    return result
}

const getSingleAcademicFacultyFromDb = async (id: string) => {
    const result = await AcademicFaculty.findOne({ id })
    return result
}

const updateSingleAcademicFacultyIntoDb = async (id: string, payload: TAcademicFaculty) => {

    const result = await AcademicFaculty.findOneAndUpdate({
        id

    }, payload, { new: true, runValidators: true })
    return result
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb,
    getSingleAcademicFacultyFromDb,
    updateSingleAcademicFacultyIntoDb
}