import { TAcademicDepartment } from "./academicDepartment.interface"
import { AcademicDepartment } from "./academicDepartment.model"


const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {

    const result = await AcademicDepartment.create(payload)
    return result

}

const getAllAcademicDepartmentsFromDb = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty')
    return result
}

const getSingleAcademicDepartmentFromDb = async (id: string) => {
    const result = await AcademicDepartment.findOne({ id })
    return result
}

const updateSingleAcademicDepartmentIntoDb = async (id: string, payload: TAcademicDepartment) => {

    const result = await AcademicDepartment.findOneAndUpdate({
        id

    }, payload, { new: true, runValidators: true })
    return result
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getAllAcademicDepartmentsFromDb,
    getSingleAcademicDepartmentFromDb,
    updateSingleAcademicDepartmentIntoDb
}