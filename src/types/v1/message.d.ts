

export interface SendMessageInput {
    message?: string
    file?: string[]
    images?: string[]
    replyId?: string
    queryRoomId: string,
    profileId: string
}