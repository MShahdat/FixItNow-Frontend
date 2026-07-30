


export const getSingleService = async (id: string) => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${id}`)

  const result = await res.json()
  return result
}