import { cookies } from "next/headers"



export const getMyServices = async () => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/my`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ['my-services']
    }
  })

  const result = await res.json();

  return result

}