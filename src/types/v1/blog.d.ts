import { Blog } from '@prisma/client'



export interface BlogCreateDataType extends Partial<Blog> {
    title: string
    images: [],
    longDisc: string
    BlogTags: []
    profileId: string
}



