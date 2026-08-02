
"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const updateReview = async (reviewId: string, previousSatae: any, formData: FormData) => {

  // console.log('form data ', formData)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const payload = {
    rating: formData.get('rating'),
    comment: formData.get('comment')
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag('customer-reviews', { expire: 0 })
    revalidateTag('customer-bookings', { expire: 0 })
  }

  // if (result.success) {
  //   redirect('dashboard/customer/reviews')
  // }

  return result
}