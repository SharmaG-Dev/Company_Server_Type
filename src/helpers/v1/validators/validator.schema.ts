import joi from 'joi'


export const SignupValidateSchema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required(),
    password: joi.string().required().min(6),
    googleId: joi.string().optional()
})




export const loginValidateSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
})



export const deleteUserSchema = joi.object({
    id: joi.string().required()
})



export const AdminSignupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    avatar: joi.string().required()
})


export const AdminLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
})



export const TagsValidateSchema = joi.object({
    title: joi.string().required().min(1)
})


export const TagsDeleteValidateSchema = joi.object({
    id: joi.string().required().uuid()
})

export const TagsGetValidateSchem = joi.object({
    id: joi.string().uuid().optional(),
    active: joi.string().optional()
})



export const BlogCreateValidateschema = joi.object({
    title: joi.string().required().min(1),
    images: joi.array().required().min(1),
    sortDisc: joi.string().required().min(1),
    longDisc: joi.string().required().min(1),
    BlogTags: joi.array().required().min(1),
    profileId: joi.string().required()

})

export const BlogGetValidatesSchema = joi.object({
    id: joi.string().uuid()
})
export const BlogDeleteSchema = joi.object({
    id: joi.string().uuid()
})



