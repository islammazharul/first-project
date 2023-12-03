
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from './student.zod';
// import studentValidationSchema from './student.joi';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;

//     // data validation using joi
//     // const { error, value } = studentValidationSchema.validate(studentData)
//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something went wrong',
//     //     error: error.details
//     //   })
//     // }

//     // data validation using zod
//     const zodParsedData = studentValidationSchema.parse(studentData);

//     // will call service func to send this data
//     const result = await studentServices.createStudentIntoDb(zodParsedData);

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student created successfully',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       data: error,
//     });
//   }
// };



const getAllStudents = catchAsync(async (req, res) => {

  const result = await studentServices.getAllStudentsFromDb();
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are getting successfully',
    data: result
  })

})

const getSingleStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDb(studentId);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student get successfully',
    data: result
  })
})
const updateStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const {studentData} = req.body
  console.log(studentId);
  const result = await studentServices.updateStudentFromDb(studentId, studentData);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update student successfully',
    data: result
  })
})

const deleteStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDb(studentId);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student has been delete successfully',
    data: result
  })
})

export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
