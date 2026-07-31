"use server"

import { cookies } from "next/headers"

export const createAccessToken = async () => {

  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value ?? null


  if (!refreshToken) {
    return {
      success: false,
      message: "refresh token not found"
    }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/access-token`, {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`
    },
    cache: "no-store",
  })

  const result = await res.json()
  // console.log('result ', result)

  return result
}