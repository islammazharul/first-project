import { studentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const result = await studentModel.create(student);
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await studentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};
