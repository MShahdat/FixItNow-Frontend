'use server'

import { cookies } from "next/headers"


export const bookingStatusUpdate = async (bookingId: string, formData: FormData) => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const payload = {
    status: formData.get('status')
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  return result
}