export const getChatHistoryByPersonaId = async (personaId: string) => {
  try {
    const res = await fetch(`/api/chat/history/${personaId}`, {
      method: "GET",
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
