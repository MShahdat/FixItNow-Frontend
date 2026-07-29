


export const getServices = async () => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ["services"]
    }
  })

  const result = await res.json()
  // console.log('all services ', result)

  return result
}