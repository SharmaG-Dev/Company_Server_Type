import { Tags } from '@prisma/client';




export interface CreateTagInput extends Partial<Tags> {
    title: string
}

