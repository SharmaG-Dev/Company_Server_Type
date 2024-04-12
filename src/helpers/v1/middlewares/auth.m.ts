import { NextFunction, Response } from 'express'
import Jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { TokenResponse } from '../../../types/v1/token'
import { GetSingleUser } from '../func/user.func'
import { customRequest } from '../../../types/v1/request'
import { GetselfAdmin } from '../func/admin/authAdmin.func'

config()

// Extend the Request type to include the 'user' property


export async function Authorization(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token)
      return res.status(401).json({ error: true, message: 'token not found' })

    Jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async function (error, decode) {
        if (error)
          return res.status(401).json({ error: true, message: error.message })
        const { id, role } = decode as Partial<TokenResponse>

        let _user

        if (role && role === 'admin') {
          _user = await GetselfAdmin(id as string)
        } else {
          _user = await GetSingleUser(id as string)

        }

        if (!_user)
          return res.status(401).json({ error: true, message: 'no user found' })

        // Assign _user to req.user
        req.user = _user
        next()
      }
    )
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
