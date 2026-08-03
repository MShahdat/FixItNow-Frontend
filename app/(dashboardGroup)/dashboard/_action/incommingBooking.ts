'use server'

import { cookies } from "next/headers"


export const incomingBooking = async () => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/bookings/incomming`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    }
  })


  const result = await res.json()

  return result
}