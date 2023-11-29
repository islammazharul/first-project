import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.services";



const createAcademicDepartment = catchAsync(async (req, res) => {

    // will call service func to send this data
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

    // send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result
    })
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Department fetched successfully',
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(_id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get a single Academic Department fetched successfully',
        data: result
    })

})
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateDepartment = req.body
    const result = await AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDb(id, updateDepartment)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update single Academic Department successfully',
        data: result
    })

})

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment
}