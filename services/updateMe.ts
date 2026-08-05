'use server'

import { cookies } from "next/headers";
import { uploadImage } from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";

export const updateProfile = async (previousState: any, formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

  const role = formData.get('role') as 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN'

  const profileImageFile = formData.get('profileImage') as File | null
  let profileImageUrl: string | undefined = undefined

  if (profileImageFile instanceof File && profileImageFile.size > 0) {
    if (profileImageFile.size > MAX_IMAGE_SIZE) {
      return {
        success: false,
        message: 'Profile image must be 5MB or smaller',
      }
    }

    profileImageUrl = await uploadImage(profileImageFile, 'profile-images')
  }

  const base = {
    ...(profileImageUrl ? { profileImage: profileImageUrl } : {}),
    phone: formData.get('phone') ?? null,
    address: formData.get('address') ?? null,
    city: formData.get('city') ?? null,
  };

  const payload =
    role === "TECHNICIAN"
      ? {
        ...base,
        bio: formData.get("bio"),
        experience: Number(formData.get("experience")),
        hourlyRate: Number(formData.get("hourlyRate")),
        skills: JSON.parse(formData.get("skills") as string),
        availability: JSON.parse(formData.get("availability") as string),
      }
      : { ...base };

  let res
  if (role === 'CUSTOMER') {
    res = await fetch(`${process.env.BACKEND_API_URL}/api/users/profile`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify(payload)
    })
  }

  if (role === 'TECHNICIAN') {
    res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/profile`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify(payload)
    })
  }

  if (role === 'ADMIN') {
    res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/profile`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify(payload)
    })
  }

  const result = await (res as Response).json()

  if (result.success) {
    revalidateTag('technicians', { expire: 0 })
  }

  return result

}

