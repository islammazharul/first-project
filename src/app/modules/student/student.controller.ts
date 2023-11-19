import { Request, Response } from 'express';
import { studentServices } from './student.services';
import studentValidationSchema from './student.zod';
// import studentValidationSchema from './student.joi';

const createStudent = async (req: Request, res: Response) => {
  try {


    const { student: studentData } = req.body;

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData)
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details
    //   })
    // }

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData)

    // will call service func to send this data
    const result = await studentServices.createStudentIntoDb(zodParsedData);




    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error
    })
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'Students are getting successfully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'single student get successfully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
