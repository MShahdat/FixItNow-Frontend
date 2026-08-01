'use server'

import { IServiceCreate } from "@/lib/interface";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const createService = async (previousState: any, formData: FormData) => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  if (!accessToken) {
    return {
      success: false,
      messeage: 'user not logged in'
    }
  }

  const coverFile = formData.get("cover") as File;
  // const coverUrl = await uploadImage(coverFile);

  const payload: IServiceCreate = {
    categoryId: formData.get("categoryId") as string,
    // cover: coverUrl,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    type: formData.get("type") as string,
    location: JSON.parse(formData.get("location") as string),
    duration: formData.get("duration") as string,
    availableAt: JSON.parse(formData.get("availableAt") as string),
  };


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
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
    revalidateTag('my-services', { expire: 0 })
    revalidateTag('services', {expire: 0})
  }

  return result

}