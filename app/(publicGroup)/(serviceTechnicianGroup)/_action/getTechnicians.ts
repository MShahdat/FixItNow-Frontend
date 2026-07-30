'use server'


export const getTechnicians = async () => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians`, {
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