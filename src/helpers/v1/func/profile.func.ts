import { Prisma } from '@prisma/client'
import { genId, prisma } from '../../../config/Client'
import {
  FriendRequestInputCreate,
  ProfileGetParams,
  ProfileInput,
  ProfileUpdateInput,
  removeFriendsInput,
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
    include: {
      friendRequestRecieved: true,
      friendRequestSent: true,
      friendsList: true
    }
  })
  return _profiles
}


export async function GetSingleprofile(profileId: string) {
  const _profile = await prisma.profile.findUnique({
    where: {
      id: profileId
    },
    include: {
      friendRequestRecieved: true,
      friendRequestSent: true,
      friendsList: true,
    }
  })

  return _profile
}





// Friends Request Api  


export async function CreateFriendRequest(input: FriendRequestInputCreate) {
  const { receiverId, senderId } = input


  const response = await prisma.friendsRequest.create({
    data: {
      receiverId: receiverId,
      senderId: senderId
    }
  })

  return response
}



export async function AcceptFriendRequest(input: FriendRequestInputCreate) {
  try {
    const { id, senderId, receiverId, status } = input;

    const _updated = await prisma.friendsRequest.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    if (!_updated) {
      return 'no request found ';
    }

    if (_updated.status === 'rejected') {
      return _updated;
    }

    await prisma.profile.update({
      where: {
        id: _updated.receiverId,
      },
      data: {
        friendId: senderId
      },
    });

    await prisma.profile.update({
      where: {
        id: _updated.senderId,
      },
      data: {
        friendId: receiverId
      },
    });

    return 'Friend request accepted successfully';
  } catch (error) {
    // Handle error
    console.error('Error accepting friend request:', error);
    throw new Error('Failed to accept friend request');
  }
}


export async function RemoveFriend(input: removeFriendsInput) {
  const { userProfileId, profileId } = input

  const [_userUpdate, secondUserUpdate] = await Promise.all([
    prisma.profile.update({
      where: {
        id: profileId
      },
      data: {
        friendsList: {
          disconnect: {
            id: userProfileId
          }
        }
      }
    }),
    prisma.profile.update({
      where: {
        id: userProfileId
      },
      data: {
        friendsList: {
          disconnect: {
            id: profileId
          }
        }
      }
    })
  ])


  if (!_userUpdate && !secondUserUpdate) throw Error('failed to remove friend')

  return 'successfully removed friend'
}