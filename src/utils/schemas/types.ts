import { z } from "zod";
import { createPatientFormSchema, getFirebaseUserSchema, patientSchema, signInUserFormSchema, signUpUserFormSchema, updatePatientFormSchema, userSchema } from "./schemas";

export type UserData = z.infer<typeof userSchema>
export type SignUpUserFormData = z.infer<typeof signUpUserFormSchema>
export type SignInUserFormData = z.infer<typeof signInUserFormSchema>
export type GetFirebaseUserData = z.infer<typeof getFirebaseUserSchema>
export type PatientData = z.infer<typeof patientSchema>
export type CreatePatientFormData = z.infer<typeof createPatientFormSchema>
export type UpdatePatientFormData = z.infer<typeof updatePatientFormSchema>