import { Prisma } from '@prisma/client';
import { AdminInput } from '../../../../types/v1/admin/authAdmin';
import crypto from 'crypto'
import { prisma } from '../../../../config/Client';


export const CreateAdmin = async (input: AdminInput) => {


    let hashPass: string = ''

    if (input.password) {
        hashPass = crypto.createHash('md5').update(input.password).digest('hex')
    }

    const _input: Prisma.AdminCreateInput = {
        name: input.name,
        email: input.email,
        avatar: input.avatar,
        password: hashPass
    }


    const response = await prisma.admin.create({ data: _input })
    return response
}



export const GetselfAdmin = async (id: string) => {

    const _admin = await prisma.admin.findFirst({
        where: {
            id: id
        }
    })

    return _admin
}




