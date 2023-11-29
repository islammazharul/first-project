import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian as TGuardian,
  TLocalGuardian as TLocalGuardian,
  TStudent as TStudent,
  // StudentMethods,
  StudentModel,
  TUserName as TUserName,
} from './student.interface';
// import { number } from 'joi';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name must be required'],
    maxlength: [20, 'First Name can not be 20 character'],
    trim: true,
    // custom validation
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    //     // if (firstNameStr !== value) {
    //     //   return false
    //     // }
    //     // return true
    //     return firstNameStr === value
    //   },
    //   message: "{VALUE} is not in capitalize format"
    // }
  },
  middleName: { type: String },
  lastName: {
    type: String,
    // required: [true, 'Last name must be required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not valid"
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name must be required'] },
  fatherOccupation: { type: String, required: [true, 'Occupation must be required'] },
  fatherContactNo: { type: String, required: [true, 'father Contact No must be required'] },
  motherName: { type: String, required: [true, 'mother Name must be required'] },
  motherOccupation: { type: String, required: [true, 'mother Occupation must be required'] },
  motherContactNo: { type: String, required: [true, 'mother ContactNo must be required'] },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Name must be required'] },
  occupation: { type: String, required: [true, 'occupation must be required'] },
  contactNo: { type: String, required: [true, 'contact No must be required'] },
  address: { type: String, required: [true, 'address must be required'] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, unique: true, required: [true, 'id must be required'] },
  createUser: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id must be required'],
    unique: true,
    ref: 'User'
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name must be required']
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "{VALUE} is not valid"
    },
    required: true
  },
  dateOfBirth: { type: String, required: [true, 'date Of Birth must be required'] },
  email: {
    type: String,
    required: [true, 'email must be required'],
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE} is not a valid email type"
    // }
  },
  contactNo: { type: String, required: [true, 'contact No must be required'] },
  emergencyContactNo: { type: String, required: [true, 'emergency Contact No must be required'] },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  presentAddress: { type: String, required: [true, 'present Address must be required'] },
  permanentAddress: { type: String, required: [true, 'permanent Address must be required'] },
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester'
  },
  profileImg: { type: String, required: [true, 'profile Image must be required'] },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  }
}
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})



// Query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// [ {$match: {isDeleted: {$ne: true}}} ,{ '$match': { id: '123456745' } } ]
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})


// for creating a custom static 
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// for creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
