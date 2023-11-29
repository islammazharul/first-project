import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.services";



const createAcademicFaculty = catchAsync(async (req, res) => {

    // will call service func to send this data
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body);

    // send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result
    })
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Faculty fetched successfully',
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(_id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get a single Academic Faculty fetched successfully',
        data: result
    })

})
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const updateFaculty = req.body
    const result = await AcademicFacultyServices.updateSingleAcademicFacultyIntoDb(_id, updateFaculty)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update single Academic Faculty successfully',
        data: result
    })

})

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty
}