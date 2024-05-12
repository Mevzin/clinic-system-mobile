import { z } from "zod";
import { getFirebaseUserSchema, signInUserFormSchema, signUpUserFormSchema, userSchema } from "./schemas";

export type UserData = z.infer<typeof userSchema>
export type SignUpUserFormData = z.infer<typeof signUpUserFormSchema>
export type SignInUserFormData = z.infer<typeof signInUserFormSchema>
export type GetFirebaseUserData = z.infer<typeof getFirebaseUserSchema>