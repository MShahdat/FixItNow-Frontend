'use server'


import { cookies } from "next/headers"


export const getCategories = async () => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    console.log('user not logged in')
    return
  }



  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories?}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ['categories']
    }
  })

  const result = await res.json();
  // console.log('all users ', result)

  return result

}