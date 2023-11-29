
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";


const createStudent = catchAsync(async (req, res) => {

    const { password, student: studentData } = req.body;

    // will call service func to send this data
    const result = await userServices.createStudentIntoDb(password, studentData);

    // send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully',
        data: result
    })
});

export const userController = {
    createStudent
}