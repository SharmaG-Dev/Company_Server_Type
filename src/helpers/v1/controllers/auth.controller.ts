import { Request, Response } from 'express'
import { ManageUserSignup } from '../func/user.func'
import { prisma } from '../../../config/Client'
import crypto from 'crypto'
import { CreateToken } from '../func/token.func'
import EventTracker from './../../../config/eventEmitter'

export const Signup = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const response = await ManageUserSignup(data)
    if (!response)
      return res.status(400).json({ error: true, message: 'failed to signup' })

    const token = CreateToken({
      payload: {
        id: response.id,
        email: response.email,
      },
    })

    res
      .status(200)
      .json({ error: false, message: 'success', data: response, token: token })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const _user = await prisma.user.findFirst({
      where: { email: email },
      include: { profile: true },
    })
    if (!_user)
      return res.status(404).json({ error: true, message: 'user not found' })
    // match password
    const hexPass = crypto.createHash('md5').update(password).digest('hex')
    const varifiedPassword = hexPass === _user.password
    if (!varifiedPassword)
      return res.status(401).json({ error: true, message: 'invalid password' })
    EventTracker.emit('users:active', _user.id)
    // generate Token
    const token = CreateToken({
      payload: {
        id: _user.id,
        email: _user.email,
      },
    })
    res
      .status(200)
      .json({ error: false, message: 'success', data: _user, token: token })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
