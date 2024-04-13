import { Blog } from '@prisma/client'


export interface BlogsTagsUser {
    tagid: string
}


export interface BlogCreateDataType extends Partial<Blog> {
    title: string
    images: [],
    sortDisc: string
    longDisc: string
    BlogTags: BlogsTagsUser[]
    profileId: string
}



