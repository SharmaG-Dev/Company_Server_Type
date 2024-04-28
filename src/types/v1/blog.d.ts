import { Blog, Comments, Likes, View } from '@prisma/client'


export interface BlogsTagsUser {
    tagid: string
}


export interface BlogCreateDataType extends Partial<Blog> {
    title: string
    images: [],
    sortDisc: string
    longDisc: string
    BlogTags: BlogsTagsUser[]
    profileId: string
}






export interface commentInputs extends Partial<Comments> {
    comment: string
    commentId?: string,
    blogId: string,
    profileId: string
}



export interface LikesInput extends Partial<Likes> {
    blogId?: string
    commentsId?: string,
    userId: string
}


export interface ViewsInput extends Partial<View> {
    blogId?: string
    profileId?: string
    userid: string
}



export interface SubCommentsGet {
    blogId: string
    commentId: string
}