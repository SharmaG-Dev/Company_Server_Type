import { Prisma } from '@prisma/client';
import { CreateTagInput } from '../../../types/v1/tags';
import { prisma } from '../../../config/Client';



export const CreateTag = async (input: CreateTagInput) => {
    const { title } = input

    const _tag: Prisma.TagsCreateInput = {
        title: title
    }
    const response = await prisma.tags.create({ data: _tag })
    return response
}



export const deactivateTag = async (id: string) => {
    const _deletedData = await prisma.tags.update({ where: { id }, data: { isActive: false } })
    return _deletedData
}



export const GetTags = async ({ id }: { id?: string }) => {

    let _find = {}
    if (id) {
        _find = { where: { id: id } }
    }
    const response = await prisma.tags.findMany(_find)
    return response
}

export const GetActiveTags = async () => {

    const response = await prisma.tags.findMany({ where: { isActive: true } })

    return response
}