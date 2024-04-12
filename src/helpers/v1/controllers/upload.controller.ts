import { Request, Response } from 'express';
import { uploadFile } from '../func/media.func';



export const handleUploadFile = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[]



        const urls = await uploadFile({ id: 'thisis', files })

        res.status(200).json({ error: false, message: 'success', data: urls })
    } catch (error) {
        res.status(500).json({ error: true, message: error as unknown as Record<string, unknown> })
    }
}