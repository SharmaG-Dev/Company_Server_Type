import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { tokenInput } from '../../../types/v1/token'

dotenv.config()

export const CreateToken = ({ payload }: { payload: tokenInput }) => {
  const token = Jwt.sign(payload, process.env.SECRET_KEY || '', {
    expiresIn: '30d',
  })
  return token
}
