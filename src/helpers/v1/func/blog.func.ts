import { Prisma } from '@prisma/client';
import { genId, prisma } from '../../../config/Client';
import { BlogCreateDataType } from '../../../types/v1/blog';




export async function CreateBlogPost(input: BlogCreateDataType) {

    const blogId = genId()

    const _blogTagsData = input.BlogTags.map((item) => (
        {
            tag: {
                connect: {
                    id: item.tagid
                }
            }
        }
    ))

    const _blog: Prisma.BlogCreateInput = {
        id: blogId,
        title: input.title,
        images: input.images,
        longDisc: input.longDisc,
        profile: {
            connect: {
                id: input.profileId
            }
        },
        BlogTags: {
            create: _blogTagsData
        },
        sortDisc: input.sortDisc
    }


    const _createdBlog = await prisma.blog.create({
        data: _blog, include: {
            BlogTags: {
                include: {
                    tag: true
                }
            },
            profile: true
        }
    })
    return _createdBlog
}




export const GetBlogPost = async ({ id }: { id?: string }) => {
    const _find: any = {
        include: {
            BlogTags: {
                include: {
                    tag: true
                }
            },
            profile: true
        }
    };

    if (id) {
        _find.where = { id };
    }
    const _blogs = await prisma.blog.findMany(_find);

    return _blogs;
};



export const DeleteBlog = async ({ id }: { id?: string }) => {
    const _blog: any = {}
    const _blogtags: any = {}

    if (id) {
        _blog.where = { id }
        _blogtags.where = { blogId: id }
    }
    await prisma.blogTags.deleteMany(_blogtags)
    const _delete = await prisma.blog.deleteMany(_blog)

    return _delete
}



export const GetprofileBlogs = async ({ profileId }: { profileId: string }) => {


    const _blogs = await prisma.blog.findMany({
        where: { profileId: profileId }, include: {
            BlogTags: {
                include: {
                    tag: true
                }
            },
            profile: true
        }
    })
    return _blogs
}
