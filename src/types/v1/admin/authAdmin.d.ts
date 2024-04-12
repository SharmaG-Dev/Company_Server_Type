import { Admin } from '@prisma/client'




export interface AdminInput extends Partial<Admin> {
    name: string
    email: string
    password: string
    avatar: string
}

export interface LoginInput {
    email: string
    password: string
}