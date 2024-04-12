import { NextFunction, Request, Response } from 'express';
import joi from 'joi'



export const validateParams = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema: joi.ObjectSchema
) => {

    const { error } = schema.validate(req.params)

    if (error) return res.status(400).json({ error: true, message: error.details[0].message })

    next()
}


export const validateBody = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema: joi.ObjectSchema
) => {

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).json({ error: true, message: error.details[0].message })

    next()
}

export const validateQuery = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema: joi.ObjectSchema
) => {

    const { error } = schema.validate(req.query)

    if (error) return res.status(400).json({ error: true, message: error.details[0].message })

    next()
}

