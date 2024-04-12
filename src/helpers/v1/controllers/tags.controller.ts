import { Request, Response } from 'express';
import { CreateTagInput } from '../../../types/v1/tags';
import { CreateTag, GetActiveTags, GetTags, deactivateTag } from '../func/tags.func';




export const RegisterTag = async (req: Request, res: Response) => {
    const formdata = req.body as CreateTagInput

    try {
        const response = await CreateTag(formdata)
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const deleteTag = async (req: Request, res: Response) => {
    const id = req.params.id as string
    try {
        const response = await deactivateTag(id)
        if (!response) return res.status(400).json({ error: true, message: response })

        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const GetTagsList = async (req: Request, res: Response) => {
    const id = req.query.id as string

    try {
        const response = await GetTags({ id: id })
        if (!response) return res.status(404).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}

export const GetTagsActiveList = async (req: Request, res: Response) => {
    try {
        const response = await GetActiveTags()
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}