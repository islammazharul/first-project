import { z } from "zod";

const userNameSchema = z.object({
    firstName: z.string().min(1).max(20).refine((value) => /^[A-Za-z]+$/.test(value), {
        message: "First Name must contain only alphabetical characters",
    }),
    middleName: z.string().optional(),
    lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
        message: "Last Name must contain only alphabetical characters",
    }),
});

const guardianSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

const localGuardianSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
});

const studentValidationSchema = z.object({
    id: z.string().min(1).refine((value) => !/\s/.test(value), {
        message: "ID must not contain whitespace",
    }),
    password: z.string().max(20),
    name: userNameSchema,
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().min(1),
    email: z.string().email(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string().min(1),
    isActive: z.enum(["active", "blocked"]).default("active"),
    isDeleted: z.boolean().default(false)
});

export default studentValidationSchema