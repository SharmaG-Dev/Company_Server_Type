import { Request, Response } from 'express';
import { BlogCreateDataType } from '../../../types/v1/blog';
import { CreateBlogPost, CreateComment, DeleteBlog, DeleteComment, GetBlogPost, GetSingleBlog, GetprofileBlogs, RecordLikes, RemoveLike, ViewRegister } from '../func/blog.func';
import { customRequest } from '../../../types/v1/request';
import { User } from '@prisma/client';




export const CreateBlog = async (req: Request, res: Response) => {
    const formdata = req.body as BlogCreateDataType
    try {
        const response = await CreateBlogPost(formdata)
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const GetBlog = async (req: Request, res: Response) => {
    try {
        const response = await GetBlogPost()
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const handleGetSingleBlog = async (req: Request, res: Response) => {
    const id = req.params.id as string
    try {
        const response = await GetSingleBlog(id)
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const handleDeleteBlog = async (req: Request, res: Response) => {
    const id = req.query.id as string
    try {
        const response = await DeleteBlog({ id })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}



export const handlGetProfileBlogs = async (req: Request, res: Response) => {
    const profileId = req.params.profileId as string
    try {
        const response = await GetprofileBlogs({ profileId: profileId })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}




export const handleCommentCreate = async (req: customRequest, res: Response) => {
    const { id } = req.params
    const { comment, commentId } = req.body
    const { profileId } = req.user as User
    try {
        const response = await CreateComment({ blogId: id, comment: comment, commentId: commentId, profileId: profileId })
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}



export const handleDeleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    try {
        const response = await DeleteComment(commentId)
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}



export const handleLIke = async (req: customRequest, res: Response) => {
    const { blogId, commentId } = req.query as { blogId?: string, commentId?: string }
    const { id } = req.user as User
    try {
        const resposne = await RecordLikes({ userId: id, blogId: blogId, commentsId: commentId })

        if (!resposne) return res.status(400).json({ error: true, message: resposne })
        res.status(200).json({ error: false, message: 'success', data: resposne })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}



export const handleUnlike = async (req: customRequest, res: Response) => {
    const { commentsId, blogId } = req.query as { commentsId?: string, blogId?: string }
    const { id } = req.user as User
    try {

        if (!commentsId && !blogId) return res.status(401).json({ error: true, message: 'provide the commentId or blogId' })
        const response = await RemoveLike({ userId: id, commentsId, blogId })

        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}



// views Api 


export const handleViews = async (req: customRequest, res: Response) => {
    const { profileId, blogId } = req.query as { profileId?: string, blogId?: string }
    const { id } = req.user as User

    try {
        const response = await ViewRegister({ userid: id, profileId: profileId, blogId: blogId })
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}