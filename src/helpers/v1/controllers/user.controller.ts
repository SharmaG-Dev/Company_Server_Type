import { Request, Response } from 'express'
import { GetSingleUser, Removeuser } from '../func/user.func'
import { customRequest } from '../../../types/v1/request'

export const DeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const response = await Removeuser(id)
    if (!response)
      return res.status(400).json({ error: true, message: 'failed to delete' })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}

export const GetSelfuser = async (req: customRequest, res: Response) => {
  const { id } = req.user

  try {
    const response = await GetSingleUser(id)
    if (!response)
      return res.status(400).json({ error: true, message: 'no user found' })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}









