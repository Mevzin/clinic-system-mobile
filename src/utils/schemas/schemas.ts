import { z } from 'zod'

export const userSchema = z
    .object({
        id: z.string().nullable(),
        email: z.string().nullable(),
        name: z.string().nullable(),
        photoURL: z.string().nullable(),
    })
    .nullable()

export const signUpUserFormSchema = z
    .object({
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