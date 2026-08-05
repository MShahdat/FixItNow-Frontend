


export const getServices = async (searchParams: Record<string, string | string[] | undefined>) => {
  if (!process.env.BACKEND_API_URL) {
    return {
      success: false,
      message: "Backend URL is not configured",
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPage: 0 },
    };
  }

  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
  });

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services?${params.toString()}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 12,
        tags: ["services"],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("getServices error", error);
    return {
      success: false,
      message: "Unable to load services right now",
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPage: 0 },
    };
  }
};