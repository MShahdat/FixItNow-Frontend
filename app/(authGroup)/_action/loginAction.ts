"use server"

import { LoginState } from "@/lib/interface"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from 'jsonwebtoken'


export const loginAction = async (previousSatae: LoginState, formData: FormData) => {

  // console.log('form data ', formData)

  const cookieStore = await cookies()

  const email = formData.get("email")
  const pass = formData.get("password")

  const payload = {
    email,
    password: pass
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  //& set cookies
  if (result.success) {
    const accessToken = result?.data?.accessToken
    const refreshToken = result?.data?.refreshToken

    cookieStore.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    })
    cookieStore.set('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
    })

    const decodeUser = jwt.decode(accessToken) as JwtPayload
    // console.log('decoded user ', decodeUser)
    if (decodeUser.role === "CUSTOMER") {
      redirect('/dashboard/customer')
    }
    else if (decodeUser.role === "TECHNICIAN") {
      redirect('/dashboard/technician')
    }
    else if (decodeUser.role === 'ADMIN') {
      redirect('/dashboard/admin')
    }
    // redirect('/dashboard/customer')
  }

  return result
}