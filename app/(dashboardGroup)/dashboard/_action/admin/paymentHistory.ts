
import { cookies } from "next/headers"



export const paymentHistory = async (
  searchParams: Record<string, string | string[] | undefined> = {}
) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    console.log('user not logged in')
    return
  }

  const params = new URLSearchParams({
    page: "1",
    limit: "99999",
  })

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.append(key, value)
    }
  })

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/payment-history?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  )

  const result = await res.json();
  // console.log('result', result)

  return result

}