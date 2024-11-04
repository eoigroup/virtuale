import { API_URL, AGENT_API_KEY, AGENT_AUTHOR } from "@/lib/config";

export const getPersonaStats = async (personaId: string) => {
  try {
    const formData = new FormData();
    formData.append("action", "get_persona_stats");
    formData.append("persona_id", personaId);

    console.log('Making request to:', `${API_URL}/api/stats`);
    console.log('With persona ID:', personaId);

    const headers = {
      "Authorization": `Api-Key ${AGENT_API_KEY}`,
      "Author": AGENT_AUTHOR,
    };

    console.log('Request headers:', headers);

    const response = await fetch(`${API_URL}/api/stats`, {
      method: "POST",
      headers: headers,
      body: formData
    });

    if (!response.ok) {
      console.error('Stats API Error:', {
        status: response.status,
        statusText: response.statusText
      });
      
      return {
        msg_count: [
          { type: "text", count: 0 },
          { type: "audio", count: 0 },
          { type: "photo", count: 0 }
        ]
      };
    }

    const result = await response.json();
    return result.data;

  } catch (error) {
    console.error('Stats API Error:', error);
    return {
      msg_count: [
        { type: "text", count: 0 },
        { type: "audio", count: 0 },
        { type: "photo", count: 0 }
      ]
    };
  }
}; 