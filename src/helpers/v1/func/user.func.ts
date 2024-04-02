import { Client } from '../../../config/Client'
import { UserProps } from '../../../types/v1/user'

export async function CreateUser({ data }: { data: UserProps }) {
  try {
    const response = await Client.user.create({ data })
    return response // Return the response if successful
  } catch (error) {
    return { error: true, message: error.message || 'An error occurred' }
  }
}
