import { Response } from 'express';
import { customRequest } from '../../../../types/v1/request';
import { Admin } from '@prisma/client';
import { GetselfAdmin } from '../../func/admin/authAdmin.func';



export const findSelfAdmin = async (req: customRequest, res: Response) => {
    const { id } = req.user as Partial<Admin>
    try {
        const response = await GetselfAdmin(id as string)
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}