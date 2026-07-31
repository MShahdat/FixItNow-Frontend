'use server'


export const getTechnicians = async (searchParams: Record<string, string | string[] | undefined>) => {

  const params = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
  });

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians?${params.toString()}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ["services"]
    }
  })

  const result = await res.json()
  // console.log('all technicians ', result)

  return result
}