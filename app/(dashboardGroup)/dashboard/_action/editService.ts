'use server'

import { IServiceUpdate } from "@/lib/interface";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const editService = async (id: string, previousState: any, formData: FormData) => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  const coverFile = formData.get("cover") as File;
  // const coverUrl = await uploadImage(coverFile);

  const payload: IServiceUpdate = {
    // cover: coverUrl,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    type: formData.get("type") as string,
    location: JSON.parse(formData.get("location") as string),
    duration: formData.get("duration") as string,
    availableAt: JSON.parse(formData.get("availableAt") as string),
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${id}`, {
    method: 'PUT',
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag('my-services', { expire: 0 })
    revalidateTag('services', { expire: 0 })
  }

  return result
}