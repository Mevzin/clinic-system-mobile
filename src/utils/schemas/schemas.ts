import { z } from 'zod'

export const userSchema = z
    .object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
        photoURL: z.string(),
    })

export const signUpUserFormSchema = z
    .object({
        name: z
            .string({ required_error: 'Nome é obrigatório' }),
        email: z
            .string({ required_error: 'E-mail é obrigatório' })
            .email('E-mail inválido'),
        password: z
            .string({ required_error: 'Senha é obrigatório' })
            .min(6, 'A senha deve conter no mínimo 6 dígitos'),
        confirmPassword: z.string({
            required_error: 'Confirmação de senha é obrigatório',
        }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'As senhas não conhecidem',
        path: ['confirmPassword'],
    })

export const signInUserFormSchema = z.object({
    email: z
        .string({ required_error: 'E-mail é obrigatório' })
        .email('E-mail inválido'),
    password: z.string({ required_error: 'Senha é obrigatório' }).refine((data) => data.trim() !== '', {
        message: 'Senha invalida!'
    }),
})

export const getFirebaseUserSchema = z.object({
    user: z
        .object({
            uid: z.string().nullable(),
            email: z.string().nullable(),
            displayName: z.string().nullable(),
            photoURL: z.string().nullable(),
        })
        .nullable(),
})

export const patientSchema = z.object({
    id: z.string(),
    age: z.number(),
    name: z.string(),
    email: z.string(),
    anamnesisId: z.string(),
    photoURL: z.string().optional(),
})

export const createPatientFormSchema = z.object({
    age: z.coerce
        .number({ required_error: 'Idade é obrigatório' })
        .max(100, 'Idade inválida')
        .gte(-1, { message: 'Idade é obrigatório' }),
    name: z
        .string({ required_error: 'Nome é obrigatório' })
        .refine((data) => data.trim() !== '', {
            message: 'O campo nome não pode ser vazio',
        })
        .refine((data) => data.length >= 3, {
            message: 'O campo nome deve conter mais de 3 caracteres',
        }),
    email: z
        .string({ required_error: 'E-mail é obrigatório' })
        .email({ message: 'E-mail inválido' }),
    photoURL: z.string(),
})

export const updatePatientFormSchema = z.object({
    age: z.coerce
        .number({ required_error: 'Idade é obrigatório' })
        .max(100, 'Idade inválida')
        .gte(-1, { message: 'Idade é obrigatório' }),
    name: z
        .string({ required_error: 'Nome é obrigatório' })
        .refine((data) => data.trim() !== '', {
            message: 'O campo nome não pode ser vazio',
        })
        .refine((data) => data.length >= 3, {
            message: 'O campo nome deve conter mais de 3 caracteres',
        }),
    email: z
        .string({ required_error: 'E-mail é obrigatório' })
        .email({ message: 'E-mail inválido' }),
    photoURL: z.string(),
})