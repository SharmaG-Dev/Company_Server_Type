import { Socket } from 'socket.io';
import EventTracker from './../../../config/eventEmitter'
import { GetBlogPost } from '../func/blog.func';


const userActives: any[] = []



export const handleSocket = async (socket: Socket) => {
    console.log('socket connection added', socket.id)

    socket.on('blogs', async () => {
        const _blogs = await GetBlogPost()
        socket.broadcast.emit('blogs', JSON.stringify(_blogs))
    })

    EventTracker.on('users:active', (data) => {
        const activeUser = HandleUserCounts(data)
        socket.broadcast.emit('users:active', activeUser)
    })

    EventTracker.on('Blog:new', async () => {
        const _blogs = await GetBlogPost()
        socket.broadcast.emit('blogs', JSON.stringify(_blogs))
    })

}


export function HandleUserCounts(data: any) {
    if (!userActives.includes(data)) {
        userActives.push(data)
    }

    return userActives.length
}





