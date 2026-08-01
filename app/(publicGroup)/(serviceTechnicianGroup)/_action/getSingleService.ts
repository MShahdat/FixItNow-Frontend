


export const getSingleService = async (id: string) => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${id}`, {
    cache: "no-store",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ["single-service"]
    }
  })

  const result = await res.json()
  return result
}