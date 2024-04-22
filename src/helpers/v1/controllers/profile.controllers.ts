import { Request, Response } from 'express'
import { AcceptFriendRequest, CreateFriendRequest, GetProfiles, GetSingleprofile, RemoveFriend, UpdateUserProfile } from '../func/profile.func'
import { ProfileGetParams } from '../../../types/v1/profile'
import { customRequest } from '../../../types/v1/request'
import { Status, User } from '@prisma/client'

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


export const SingleProfileGet = async (req: customRequest, res: Response) => {
  const { profileId } = req.params
  const userData = req.user as User
  try {
    let _find = profileId as string
    if (!profileId) {
      _find = userData.profileId
    }
    const response = await GetSingleprofile(_find)
    if (!response) return res.status(400).json({ error: true, message: response })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}


export const handleFriendRequestSent = async (req: customRequest, res: Response) => {
  const { profileId } = req.user as User
  const id = req.params.profileId

  try {
    const response = await CreateFriendRequest({ receiverId: id, senderId: profileId })
    if (!response) return res.status(400).json({ error: true, message: response })

    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}


export const handleFriendRequestAccept = async (req: customRequest, res: Response) => {
  const { profileId } = req.user as User
  const { requestId, senderId } = req.params;
  const status = req.params.status

  let StatusType: Status

  if (status === 'true') {
    StatusType = 'accepted'
  } else {
    StatusType = 'rejected'
  }

  console.log(requestId, senderId, profileId, StatusType)

  try {
    const response = await AcceptFriendRequest({ id: requestId, senderId: senderId, receiverId: profileId, status: StatusType })
    if (!response) return res.status(400).json({ error: true, message: response })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}




export const handleRemoveFriends = async (req: customRequest, res: Response) => {
  const { profileId } = req.user as User
  const id = req.params.profileId
  try {
    const response = await RemoveFriend({ profileId: id, userProfileId: profileId })
    if (!response) return res.status(400).json({ error: true, message: response })
    res.status(200).json({ error: false, message: 'success', data: response })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
