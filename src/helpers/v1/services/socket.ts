import { Socket } from 'socket.io';
import EventTracker from './../../../config/eventEmitter'
import { GetBlogPost } from '../func/blog.func';
import { GetRoomMessage, GetRoomParticipants } from '../func/Query.func';
import { QueryHashtagUnique } from '../utils/queryHashtag';
import { HandleToken } from './token.handler';
import { User } from '@prisma/client';



const userActives = new Map()
const InRooomUser = new Map()



export const handleSocket = async (socket: Socket) => {
    let _user
    const token = socket.handshake?.query?.token as string
    console.log('connected user', token)
    // console.log('socket connection added', socket.handshake.query.token)
    if (token) {
        _user = await HandleToken(token) as User
        if (_user) {
            userActives.set(_user?.id, _user)
        }
    }

    socket.on('joined-room', (data: { user: string, roomId: string }) => {

        const roomId = InRooomUser.get(data?.roomId)
        if (roomId) {
            InRooomUser.set(data?.roomId, [...roomId, data?.user])
        } else {
            InRooomUser.set(data?.roomId, [data?.user])
        }
        console.log(InRooomUser)
    })

    // Leave room lagana baki hai lagao 
    socket.on('leave-room', (data: { user: string, roomId: string }) => {
        const roomId = InRooomUser.get(data?.roomId)
        const newData = roomId.filter((item: string) => item !== data?.user)
        InRooomUser.set(data?.roomId, [...newData])
        console.log(InRooomUser)
    })


    socket.on('room-users', async (roomId: string) => {
        try {
            const response = await GetRoomParticipants(roomId)
            const data = {
                response,
                InRooomUser,
                userActives
            }
            const key = QueryHashtagUnique(roomId)
            socket.emit(`USER${key}`, JSON.stringify(data))
            socket.broadcast.emit(`USER${key}`, JSON.stringify(data))
        } catch (error) {
            console.log('error found in socket', error)
        }
    })

    socket.on('blogs', async () => {
        const _blogs = await GetBlogPost()
        socket.emit('blogs', JSON.stringify(_blogs))
    })
    socket.on('message', async (data: string) => {
        try {
            if (data !== null) {
                const _messages = await GetRoomMessage(data);
                const roomKey = QueryHashtagUnique(data)
                socket.emit(roomKey, JSON.stringify(_messages))
                socket.broadcast.emit(roomKey, JSON.stringify(_messages));
            }
        } catch (error) {
            console.error(`Error fetching messages for room ${data}:`, error);
        }
    });



    EventTracker.on('Blog:new', async () => {
        const _blogs = await GetBlogPost()
        socket.broadcast.emit('blogs', JSON.stringify(_blogs))
    })

    EventTracker.on('message', async (data: { roomId: string }) => {
        const _messages = await GetRoomMessage(data.roomId)
        const roomKey = QueryHashtagUnique(data.roomId)
        socket.broadcast.emit(roomKey, _messages)
    })

    socket.on('disconnect', async (token: string) => {
        console.log('disconnected the', token)
        if (token) {
            _user = await HandleToken(token) as User
            if (_user) {
                userActives.delete(_user?.id)
            }
        }
    })
}





