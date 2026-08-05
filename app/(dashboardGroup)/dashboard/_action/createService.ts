'use server'

import { IServiceCreate } from "@/lib/interface";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { uploadImage } from "@/lib/cloudinary";

export const createService = async (previousState: any, formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

  if (!accessToken) {
    return {
      success: false,
      message: 'user not logged in',
    }
  }

  const coverFile = formData.get("cover") as File | null
  let coverUrl: string | undefined = undefined

  if (coverFile instanceof File && coverFile.size > 0) {
    if (coverFile.size > MAX_IMAGE_SIZE) {
      return {
        success: false,
        message: 'Cover image must be 5MB or smaller',
      }
    }

    coverUrl = await uploadImage(coverFile, "service-covers")
  }

  const payload: IServiceCreate = {
    categoryId: formData.get("categoryId") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    type: formData.get("type") as string,
    location: JSON.parse((formData.get("location") as string) ?? "[]"),
    duration: formData.get("duration") as string,
    availableAt: JSON.parse((formData.get("availableAt") as string) ?? "[]"),
    ...(coverUrl ? { cover: coverUrl } : {}),
  }


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
    revalidateTag('services', { expire: 0 })
  }

  return result

}