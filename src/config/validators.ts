
import joi from 'joi'
import { ValidationCallback } from '../types/v1/validator'
import { NextFunction, Request, Response } from 'express'

export const ValidateWithSchema = (
    schema: joi.ObjectSchema,
    callback: ValidationCallback
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        callback(req, res, next, schema)
    }
}