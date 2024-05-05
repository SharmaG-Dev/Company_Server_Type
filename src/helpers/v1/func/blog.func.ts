import { Prisma } from '@prisma/client';
import { genId, prisma } from '../../../config/Client';
import { BlogCreateDataType, LikesInput, SubCommentsGet, ViewsInput, commentInputs } from '../../../types/v1/blog';





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
        isQuerry: input.isQuerry,
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




export const GetBlogPost = async () => {


    const _blogs = await prisma.blog.findMany({
        include: {
            BlogTags: {
                include: {
                    tag: true,
                }
            },
            Likes: {
                select: {
                    userId: true
                },
                where: {
                    isComment: false
                }
            },
            _count: {
                select: {
                    comments: true,
                    Likes: {
                        where: {
                            isComment: false,
                        }
                    }
                }
            },
            profile: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return _blogs;
};


export const GetSingleBlog = async (blogId: string) => {
    const response = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
        include: {
            BlogTags: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            },
            profile: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
            _count: {
                select: {
                    comments: {
                        where: { isSubComment: false }
                    },
                    Likes: {
                        where: { isBlog: true }
                    },
                    Views: {
                        where: { isBlog: true }
                    }
                }
            }
        }
    })

    return response
}


export const DeleteBlog = async ({ id }: { id?: string }) => {
    const _blog: any = {}
    const _blogtags: any = {}

    if (id) {
        _blog.where = { id }
        _blogtags.where = { blogId: id }
    }
    await prisma.blogTags.deleteMany(_blogtags)
    await prisma.comments.deleteMany({
        where: {
            blogId: id
        }
    })
    const _delete = await prisma.blog.deleteMany(_blog)

    return _delete
}



export const GetprofileBlogs = async ({ profileId }: { profileId: string }) => {


    const _blogs = await prisma.blog.findMany({
        where: { profileId: profileId }, include: {
            BlogTags: {
                include: {
                    tag: true,
                }
            },
            Likes: {
                select: {
                    userId: true
                },
                where: {
                    isComment: false
                }
            },
            _count: {
                select: {
                    comments: true,
                    Likes: {
                        where: {
                            isComment: false,
                        }
                    }
                }
            },
            profile: true
        }
    })
    return _blogs
}

// fetch the queries only 

export const getAllQueries = async () => {
    const response = await prisma.blog.findMany({
        where: {
            isQuerry: true
        },
        include: {
            BlogTags: {
                include: {
                    tag: true,
                }
            },
            Likes: {
                select: {
                    userId: true
                },
                where: {
                    isComment: false
                }
            },
            _count: {
                select: {
                    comments: true,
                    Likes: {
                        where: {
                            isComment: false,
                        }
                    }
                }
            },
            profile: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response
}



// Comments 




export const fetchComments = async (blogId: string) => {
    const _comments = await prisma.comments.findMany({
        where: { blogId: blogId, isSubComment: false }, orderBy: {
            createdAt: 'asc'
        }, include: {
            _count: {
                select: {
                    likes: true,
                    subComments: true
                }
            },
            Profile: true,
            likes: {
                select: {
                    userId: true
                }
            }
        }
    })
    return _comments
}


export const GetSubComments = async (Credentials: SubCommentsGet) => {
    const { blogId, commentId } = Credentials

    const subComments = await prisma.comments.findMany({
        where: {
            blogId: blogId,
            commentId: commentId,
            isSubComment: true
        },
        orderBy: {
            createdAt: 'asc'
        },
        include: {
            likes: {
                select: {
                    userId: true
                }
            },
            Profile: true,
            _count: {
                select: {
                    likes: true
                }
            }
        }
    })

    return subComments
}




export const CreateComment = async (input: commentInputs) => {
    const { comment, profileId, commentId, blogId } = input

    const isSubComment = Boolean(commentId)
    const _create = await prisma.comments.create({
        data: {
            comment: comment,
            blogId: blogId,
            profileId: profileId,
            isSubComment: isSubComment,
            commentId: commentId || null
        }
    })

    return _create;
};


export const DeleteComment = async (commentId: string) => {



    const deleteSubComment = await prisma.comments.delete({
        where: { id: commentId }, include: {
            subComments: true
        }
    })

    return deleteSubComment
};




// likes functions 

export const RecordLikes = async (input: LikesInput) => {
    const { userId, blogId, commentsId } = input

    const isBlog = Boolean(blogId)
    const isComment = Boolean(commentsId)

    const _findLike = await prisma.likes.findFirst({ where: { userId: userId, blogId: blogId, commentsId: commentsId, isBlog: isBlog, isComment: isComment } })

    if (_findLike) return 'already liked'
    const _likes = await prisma.likes.create({
        data: {
            isBlog: isBlog,
            isComment: isComment,
            userId: userId,
            commentsId: commentsId,
            blogId: blogId
        },

    })


    return _likes
}


export const RemoveLike = async (input: LikesInput) => {

    const { userId, blogId, commentsId } = input

    const isComment = Boolean(commentsId)

    const _deletedLike = await prisma.likes.deleteMany({
        where: {
            userId: userId,
            blogId: blogId,
            commentsId: commentsId,
            isComment: isComment
        }
    })

    return _deletedLike
}




// view Funtions 

export const ViewRegister = async (input: ViewsInput) => {

    const { userid, blogId, profileId } = input

    const isBlog = Boolean(blogId)
    const isProfile = Boolean(profileId)

    const _views = await prisma.view.create({
        data: {
            isBlog: isBlog,
            isProfile: isProfile,
            userid: userid,
            blogId: blogId,
            profileId: profileId,
        }
    })
    return _views
}
