


export const getSingleTechnician = async (id: string) => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/${id}`)

  const result = await res.json()
  // console.log('technician ', result)

  return result
}