export const getUser = async () => {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const updateUser = async (payload: any) => {
  try {
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
