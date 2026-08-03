'use server'

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const payment = async (bookingId: any) => {


  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const payload = {
    bookingId
  }


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()
  // console.log('payment create respose', result)

  if (result.success) {
    revalidateTag('customer-bookings', { expire: 0 })
    revalidateTag('customer-payments', { expire: 0 })
  }

  return result
}