'use server'


import { cookies } from "next/headers";


export const updateProfile = async (previousState: any, formData: FormData) => {

  console.log('from data profile', formData)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  const role = formData.get('role') as 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN'

  const base = {
    // profileImage: formData.get('profileImage') ?? null,
    address: formData.get('address'),
    city: formData.get('city'),

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

  return result

}

