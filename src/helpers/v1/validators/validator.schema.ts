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




