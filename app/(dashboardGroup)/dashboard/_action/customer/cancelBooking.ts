
'use server'

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const cancelBooking = async (bookingId: string, previousState: any, formData: FormData) => {


  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const payload = {
    cancelReason: formData.get('cancelReason')
  }


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/cancel/${bookingId}`, {
    method: 'PATCH',
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag('customer-bookings', { expire: 0 })
  }

  return result
}