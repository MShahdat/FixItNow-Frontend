'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export const createBookingAction = async (serviceId: string, previousState: any, formData: FormData) => {

  // console.log('form data', formData)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const payload = {
    serviceId,
    scheduledDate: formData.get('date'),
    address: formData.get('address'),
    note: formData.get('note') ?? null
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`

    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    // toast.success(result.message)
    // redirect('/dashboard/customer/bookings')
  }

  return result
}