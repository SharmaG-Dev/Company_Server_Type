import { User } from '@prisma/client'

export interface UserInput {
  name: string
  email: string
  googleId?: string
  password: string
}

export interface UserUpdateInput extends Partial<User> {
  id: string
  email?: string
  name?: string
}
