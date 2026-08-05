import { cookies } from "next/headers"



export const getAllCategories = async (
  searchParams: Record<string, string | string[] | undefined> = {}
) => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    console.log('user not logged in')
    return
  }

  const params = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
  });



  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories?${params.toString()}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ['all-categories']
    }
  })

  const result = await res.json();
  // console.log('all users ', result)

  return result

}