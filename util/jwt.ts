import jwt from 'jsonwebtoken'



const jwtVerify = (token: string, secret: string) => {
  try {
    const tokenVerify = jwt.verify(token, secret)

    if (typeof tokenVerify === 'string') {
      return false
    }

    return tokenVerify
  }
  catch (error) {
    console.log('Token varification failed')
  }
}


export const jwtToken = {
  jwtVerify,
}