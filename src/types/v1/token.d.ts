export interface tokenInput {
  id: string
  email: string
  role?: string
}

export interface TokenResponse extends Partial<tokenInput> {
  token: string
}
