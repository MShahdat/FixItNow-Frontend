
"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const deleteReview = async (reviewId: string) => {

  // console.log('form data ', formData)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`
    },

  })

  const result = await res.json()

  if (result.success) {
    revalidateTag('customer-reviews', { expire: 0 })
    revalidateTag('customer-booking', { expire: 0 })
  }

  // if (result.success) {
  //   redirect('dashboard/customer/reviews')
  // }

  return result
}