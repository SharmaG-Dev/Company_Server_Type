import { Request, Response } from 'express';
import { BlogCreateDataType } from '../../../types/v1/blog';
import { CreateBlogPost, DeleteBlog, GetBlogPost, GetprofileBlogs } from '../func/blog.func';




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
    const id = req.query.id as string
    try {
        const response = await GetBlogPost({ id })
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