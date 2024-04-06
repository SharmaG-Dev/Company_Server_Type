import { Prisma } from '@prisma/client'
import { genId, prisma } from '../../../config/Client'
import {
  ProfileGetParams,
  ProfileInput,
  ProfileUpdateInput,
} from '../../../types/v1/profile'

export async function CreateProfile(input: ProfileInput) {
  const profileId = await genId()
  const _profile: Prisma.ProfileCreateInput = {
    id: profileId,
    name: input.name,
    email: input.email,
    googleId: input.googleId,
  }

  const _createdProfile = await prisma.profile.create({
    data: _profile,
  })

  return _createdProfile
}

export async function UpdateUserProfile(input: ProfileUpdateInput) {
  const data = input

  const _updateProfile: Prisma.ProfileUpdateInput = {
    avatar: data.avatar,
    name: data.name,
  }

  const _updatedData = await prisma.profile.update({
    where: { id: data.id },
    data: _updateProfile,
  })

  return _updatedData
}

export async function DeactivateProfile(id: string) {
  const _update: Prisma.ProfileUpdateInput = {
    active: false,
  }
  const _DeactivatedProfile = await prisma.profile.update({
    where: { id },
    data: _update,
  })
  return _DeactivatedProfile
}

export async function GetProfiles(params: ProfileGetParams) {
  const _profiles = await prisma.profile.findMany({
    where: {
      ...params,
    },
  })
  return _profiles
}
