'use server'


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const createCategory = async (previousState: any, formData: FormData) => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  if (!accessToken) {
    return {
      success: false,
      messeage: 'user not logged in'
    }
  }


  const payload = {
    name: formData.get('name'),
    description: formData.get('description'),
    status: formData.get('status')
  }


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })


  const result = await res.json()
  // console.log(' info', result)

  if (result.success) {
    revalidateTag('all-categories', { expire: 0 })
  }

  return result

}