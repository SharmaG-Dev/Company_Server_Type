import { Prisma, User } from '@prisma/client'
import { genId, prisma } from '../../../config/Client'
import { UserInput, UserUpdateInput } from '../../../types/v1/user'
import crypto from 'crypto'
import { CreateProfile, DeactivateProfile } from './profile.func'

export async function ManageUserSignup(input: UserInput) {
  // check The User Profile
  const existingProfile = await prisma.profile.findFirst({
    where: {
      email: input.email,
    },
  })

  let hexPass: string = ''

  if (input.password) {
    hexPass = crypto.createHash('md5').update(input.password).digest('hex')
  }

  let _user: User
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        active: true,
      },
    })
    _user = await CreateUser(
      { ...input, password: hexPass },
      { id: existingProfile.id }
    )
  } else {
    const newProfile = await CreateProfile({
      name: input.name,
      email: input.email,
      googleId: input.googleId,
    })

    _user = await CreateUser(
      { ...input, password: hexPass },
      { id: newProfile.id }
    )
  }

  return _user
}

export async function CreateUser(
  input: UserInput,
  existingProfile: { id: string }
) {
  const userId = await genId()
  const _user: Prisma.UserCreateInput = {
    id: userId,
    email: input.email,
    googleId: input.googleId,
    password: input.password,
    profile: {
      connect: {
        id: existingProfile.id,
      },
    },
  }

  const _createduser = await prisma.user.create({
    data: _user,
    include: {
      profile: true,
    },
  })

  return _createduser
}

export async function Removeuser(id: string) {
  const _deleted = await prisma.user.delete({
    where: {
      id: id,
    },
  })
  // deactivate the profile also
  await DeactivateProfile(_deleted.profileId)
  return _deleted
}

export async function GetSingleUser(id: string) {
  try {
    const _user = await prisma.user.findFirst({
      where: { id: id },
      include: {
        profile: true
      }
    })
    return _user
  } catch (error) {
    return error
  }

}

// update user

export async function UpdateUserData(input: UserUpdateInput) {
  const data = input

  const _user: Prisma.UserUpdateInput = {
    email: data.email,
  }

  const _updated = await prisma.user.update({
    where: { id: data.id },
    data: _user,
  })

  return _updated
}






