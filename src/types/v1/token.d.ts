export interface tokenInput {
  id: string
  email: string
  profileId: string
}

export interface TokenResponse extends Partial<tokenInput> {
  token: string
}
