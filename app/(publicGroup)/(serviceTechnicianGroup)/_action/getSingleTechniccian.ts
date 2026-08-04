'use server'


export const getTechnicians = async (technicianId: string) => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/${technicianId}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ["single-technician"]
    }
  })

  const result = await res.json()
  // console.log('single technicians ', result)

  return result
}