


export type LoginState = {
  success: boolean
  statuscode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}


