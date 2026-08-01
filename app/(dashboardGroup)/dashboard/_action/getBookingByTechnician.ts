import { cookies } from "next/headers"



export const getBookingByTechnician = async (searchParams: Record<string, string | string[] | undefined>) => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value


  const params = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
  });

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/bookings?${params.toString()}`, {
    headers: {
      Cookie: `accessToken= ${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ['technician-bookings']
    }
  })

  const result = await res.json()

  return result
}