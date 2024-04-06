import { Request, Response } from 'express'
import { GetProfiles, UpdateUserProfile } from '../func/profile.func'
import { ProfileGetParams } from '../../../types/v1/profile'

export const GetAllProfile = async (req: Request, res: Response) => {
  const params = req.query as ProfileGetParams
  try {
    const response = await GetProfiles(params)
    if (!response)
      return res.status(400).json({ error: true, message: 'no data found' })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}

export const UpdateProfile = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const response = await UpdateUserProfile(data)
    if (!response)
      return res.status(400).json({ error: true, message: 'updation failed' })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
