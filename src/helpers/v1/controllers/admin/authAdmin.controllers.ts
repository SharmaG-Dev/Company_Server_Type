import { Request, Response } from 'express';
import { CreateAdmin } from '../../func/admin/authAdmin.func';
import { AdminInput, LoginInput } from '../../../../types/v1/admin/authAdmin';
import crypto from 'crypto'
import { prisma } from '../../../../config/Client';
import { CreateToken } from '../../func/token.func';


export const SignupAdmin = async (req: Request, res: Response) => {
    const formdata = req.body as AdminInput;
    try {
        const response = await CreateAdmin(formdata)
        if (!response) return res.status(400).json({ error: true, message: response })
        res.status(200).json({ error: false, message: 'success', data: response })
    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}


export const LoginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginInput

    try {
        let hashPass = ''
        if (password) {
            hashPass = crypto.createHash('md5').update(password).digest('hex')
        }
        const _user = await prisma.admin.findFirst({
            where: {
                email: email
            }
        })

        if (!_user) return res.status(404).json({ error: true, message: 'no user found' })
        const varifyPassword = _user.password === hashPass
        if (!varifyPassword) return res.status(401).json({ error: true, message: 'invalid password' })

        const token = CreateToken({
            payload: {
                email: _user.email,
                id: _user.id,
                role: 'admin'
            }
        })
        res.status(200).json({ error: false, message: 'success', data: _user, token: token })

    } catch (error) {
        res.status(500).json({ error: true, message: error })
    }
}



