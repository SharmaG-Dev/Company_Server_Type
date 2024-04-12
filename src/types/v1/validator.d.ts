import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export type ValidationCallback = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema: Joi.ObjectSchema
) => void
