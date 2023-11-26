import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;

        // data validation using zod
        // const zodParsedData = studentValidationSchema.parse(studentData);

        // will call service func to send this data
        const result = await userServices.createStudentIntoDb(password, studentData);

        // send response
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const userController = {
    createStudent
}