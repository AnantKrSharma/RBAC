import z from 'zod';

export const signupBody = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
})

export const signinBody = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const newPostBody = z.object({
    title: z.string().min(10),
    content: z.string().min(10),
    imageUrl: z.string().optional(),
})