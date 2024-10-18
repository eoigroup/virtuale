export const getAllPersonas = async () => {
  try {
    const res = await fetch("/api/personas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 5 * 60 }, // Revalidate cache every 5 mins
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

export const getUserConvos = async () => {
  try {
    const res = await fetch("/api/user/convos", {
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

export const getPersonaCategories = async () => {
  try {
    const res = await fetch("/api/personas/categories", {
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

export const getPersonaTemplates = async () => {
  try {
    const res = await fetch("/api/personas/templates", {
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
