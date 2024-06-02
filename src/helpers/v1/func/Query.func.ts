import { Prisma } from '@prisma/client'
import { CreateQueryRoomProps } from '../../../types/v1/Query'
import { QueryHashtagUnique } from '../utils/queryHashtag'
import { prisma } from '../../../config/Client'

export const createQueryRoom = async (data: CreateQueryRoomProps) => {
  const hashtagId = QueryHashtagUnique(data.QueryBlogId)
  const _input: Prisma.QueryRoomCreateInput = {
    QueryBlog: {
      connect: {
        id: data.QueryBlogId,
      },
    },
    hashtag: hashtagId,
  }

  const _created = await prisma.queryRoom.create({ data: _input })

  return _created
}


export const getRoominfo = async (id: string) => {

  const _getRoom = await prisma.queryRoom.findUnique({
    where: {
      id: id
    },
    include: {
      _count: {
        select: {
          messages: true,
          RoomParticipants: true
        }
      },
      RoomParticipants: {
        include: {
          profile: true
        }
      },
      messages: true
    }
  })



  return _getRoom
}


export const JoinRoom = async ({
  roomId,
  profileId,
}: {
  roomId: string
  profileId: string
}) => {

  console.log('step 1')
  const _findRoom = await prisma.queryRoom.findUnique({ where: { id: roomId } })
  console.log('step 2', _findRoom)
  if (!_findRoom) return 'no room found with this id '

  const _joinRoom = await prisma.roomParticipants.create({
    data: {
      Roomid: roomId,
      profileId: profileId
    }
  })
  console.log('step 3')
  return _joinRoom
}

export const LeaveRoom = async ({
  roomId,
  profileId,
}: {
  roomId: string
  profileId: string
}) => {
  const _findRoomParticipant = await prisma.roomParticipants.findUnique({
    where: {
      profileId_Roomid: { profileId: profileId, Roomid: roomId },
    },
  })
  if (!_findRoomParticipant) return 'not a participant of the room'

  const _update = await prisma.roomParticipants.delete({
    where: {
      profileId_Roomid: { profileId: profileId, Roomid: roomId },
    },
  })

  return _update
}



export const GetRoomMessage = async (roomId: string) => {
  const _document = await prisma.roomMessages.findMany({
    where: { queryRoomId: roomId }, include: {
      profile: true,
    }

  })

  return _document
}


export const GetRoomParticipants = async (roomId: string) => {
  const _document = await prisma.roomParticipants.findMany({
    where: {
      Roomid: roomId
    },
    select: {
      profile: true,
      profileId: true
    }
  })
  return _document
}




