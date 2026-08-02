"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const createReview = async (bookingId: string, previousSatae: any, formData: FormData) => {

  console.log('form data ', formData)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const payload = {
    bookingId,
    rating: formData.get('rating'),
    comment: formData.get('comment')
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    redirect('/reviews')
  }

  return result
}