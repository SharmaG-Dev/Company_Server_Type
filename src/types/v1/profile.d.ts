import { Profile } from '@prisma/client'

export interface ProfileInput {
  name: string
  email: string
  googleId?: string
}

export interface ProfileUpdateInput extends Partial<Profile> {
  id: string
  name?: string
  avatar?: string
}

export interface ProfileGetParams {
  id?: string
  active?: boolean
  email?: string
  name?: string
}
