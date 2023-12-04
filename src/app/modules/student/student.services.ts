import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

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

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  console.log('base query',query);
  const queryObj = {...query}

  let searchTerm = '';

  // IF searchTerm  IS GIVEN SET IT
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

   // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  //  {email: {$regex: query.searchTerm, $options: "i"}}
  //  {presentAddress: {$regex: query.searchTerm, $options: "i"}}
  //  {name.firstName: {$regex: query.searchTerm, $options: "i"}}

  // WE ARE DYNAMICALLY DOING IT USING LOOP

  const studentSearchableFields = ['email', 'presentAddress', 'name.firstName']

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: {$regex: searchTerm, $options: "i"}
    }))
  })

    // FILTERING fUNCTIONALITY:

    const excludeFields = ['searchTerm', 'sort', 'limit'];
    excludeFields.forEach((el) => delete queryObj[el])
  // console.log(query, queryObj);
  const filterQuery = await searchQuery.find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

     // SORTING FUNCTIONALITY:
     let sort = '-createdAt'
     if(query?.sort){
      sort = query?.sort as string
     }

     const sortQuery = filterQuery?.sort(sort)

     let limit = 1;

     if(query.limit){
      limit = (query.limit)
     }
     const limitQuery = await sortQuery.limit(limit)
  return limitQuery;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.find({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentFromDb = async (id: string, payload: Partial<TStudent>) => {

  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  // console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
