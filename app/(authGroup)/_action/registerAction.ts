'use server'

import { redirect } from "next/navigation";


export const registerAction = async (previousState: any, formData: FormData) => {
  // console.log('from data ', formData)

  const role = formData.get('role') as 'CUSTOMER' | 'TECHNICIAN'

  const base = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    role
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

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()
  // console.log('regiser info', result)

  if (result.success) {
    redirect('/login')
  }

  return result
}

