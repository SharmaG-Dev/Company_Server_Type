import { Response } from 'express';
import { SendMessage } from '../func/message.func';
import { SendMessageInput } from '../../../types/v1/message';
import { customRequest } from '../../../types/v1/request';
import { User } from '@prisma/client';







export const RegisterMessage = async (req: customRequest, res: Response) => {
    const roomid = req.params.queryRoomId
    const _user = req?.user as User

    const data = req.body
    const _messageData: SendMessageInput = {
        queryRoomId: roomid,
        ...data,
        profileId: _user.profileId
    }


    try {
        const response = await SendMessage(_messageData)
        if (!response) return res.status(404).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}