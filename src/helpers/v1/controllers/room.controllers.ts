import { Response } from 'express';
import { customRequest } from '../../../types/v1/request';
import { GetRoomMessage, JoinRoom, LeaveRoom, getRoominfo } from '../func/Query.func';




export const handleGetRoom = async (req: customRequest, res: Response) => {
    try {
        const { id } = req.params

        const response = await getRoominfo(id)
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}




export const handleJoinRoom = async (req: customRequest, res: Response) => {
    try {
        const profileId = req.user.profile.id
        const { roomid } = req.params
        console.log(profileId, roomid)
        const response = await JoinRoom({ profileId: profileId, roomId: roomid })
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'successfully joined the room' })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const handleLeaveRoom = async (req: customRequest, res: Response) => {
    try {
        const profileId = req.user.profile.id
        const { roomid } = req.params

        const response = await LeaveRoom({ roomId: roomid, profileId: profileId })
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'successfully quit the room' })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const handleGetRoomMessage = async (req: customRequest, res: Response) => {
    const roomId = req.params.roomId
    try {
        const response = await GetRoomMessage(roomId)
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}