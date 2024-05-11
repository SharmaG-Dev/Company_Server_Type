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


export const JoinRoom = async ({
  roomId,
  profileId,
}: {
  roomId: string
  profileId: string
}) => {
  const _findRoom = await prisma.queryRoom.findUnique({ where: { id: roomId } })

  if (!_findRoom) return 'no room found with this id '

  const _joinRoom = await prisma.roomParticipants.create({
    data: {
      profileId: profileId,
      Roomid: _findRoom.QueryBlogId,
    },
  })

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





