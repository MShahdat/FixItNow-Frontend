


export const getSingleTechnician = async (id: string) => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/${id}`, {
    cache: "no-store",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ["single-technician"]
    }
  })

  const result = await res.json()
  // console.log('technician ', result)

  return result
}