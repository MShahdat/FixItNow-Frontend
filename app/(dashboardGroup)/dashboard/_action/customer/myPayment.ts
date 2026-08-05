'use server'



import { cookies } from "next/headers"



export const getMyPayment = async () => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/history`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ['customer-payments']
    }
  })

  const result = await res.json()

  return result
}