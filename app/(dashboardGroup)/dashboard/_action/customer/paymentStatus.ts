'use server'


import { cookies } from "next/headers"

export const paymentStatus = async (bookingId: { bookingId: string }) => {
  console.log('booking id ', bookingId)


  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${bookingId.bookingId}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "force-cache",
  })

  const result = await res.json()

  console.log('payment status ', result)
  return result
}