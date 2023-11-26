import { Student } from './student.model';

// const createStudentIntoDb = async (studentData: TStudent) => {
//   // static method
//   if (await Student.isUserExist(studentData.id)) {
//     throw new Error('User already exists!!!');
//   }

//   // instance method
//   // const student = new Student(studentData)/* create an instance */
//   // if (await student.isUserExist(studentData.id)) {
//   //   throw new Error("User already exists!")
//   // }
//   // const result = student.save() /* built in instance method */

//   const result = await Student.create(studentData); /* built in static method */
//   return result;
// };

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
