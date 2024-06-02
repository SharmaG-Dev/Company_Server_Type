import { Prisma } from '@prisma/client';
import { prisma } from '../../../config/Client';
import { SendMessageInput } from '../../../types/v1/message';
import eventEmitter from '../../../config/eventEmitter';








export const SendMessage = async (input: SendMessageInput) => {
    const { file, images, message, replyId, queryRoomId, profileId } = input

    const isReply = Boolean(replyId)

    const _input: Prisma.RoomMessagesCreateInput = {
        message: message || '',
        file: file,
        images: images,
        QueryRoom: {
            connect: {
                id: queryRoomId
            }
        },
        profile: {
            connect: {
                id: profileId
            }
        }
    }

    if (isReply) {
        _input.replyOf = { connect: { id: replyId } }
    }

    const response = await prisma.roomMessages.create({
        data: _input
    })

    eventEmitter.emit('message', { roomId: response.queryRoomId })

    return response
}


export const deleteMessage = async (messageId: string) => {
    const response = await prisma.roomMessages.delete({ where: { id: messageId } })
    return response
}