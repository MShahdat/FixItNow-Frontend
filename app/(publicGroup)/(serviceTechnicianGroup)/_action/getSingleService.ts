


export const getSingleService = async (id: string) => {
  if (!process.env.BACKEND_API_URL) {
    return {
      success: false,
      message: "Backend URL is not configured",
      data: null,
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${id}`, {
      cache: "no-store",
      next: {
        revalidate: 60 * 60 * 1,
        tags: ["single-service"],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch service: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("getSingleService error", error);
    return {
      success: false,
      message: "Unable to load this service right now",
      data: null,
    };
  }
};