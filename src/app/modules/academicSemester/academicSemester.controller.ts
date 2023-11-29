import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.services";


const createAcademicSemester = catchAsync(async (req, res) => {

    // will call service func to send this data
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);

    // send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester created successfully',
        data: result
    })
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic semester fetched successfully',
        data: result
    })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(_id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get a single Academic semester fetched successfully',
        data: result
    })

})
const updateSingleAcademicSemester = catchAsync(async (req, res) => {
    const updateSemester = req.body
    const { _id } = req.params;
    const result = await AcademicSemesterServices.updateSingleAcademicSemesterIntoDb(_id, updateSemester)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get a single Academic semester fetched successfully',
        data: result
    })

})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester
}