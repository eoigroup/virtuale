import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { text, persona_id, format, audio } = await req.json();
  const jwtToken = req.cookies.get("jwt")?.value;

  if (!jwtToken) {
    return Response.json(
      { message: "You are not authenticated" },
      { status: 400 }
    );
  }

  return new Promise((resolve) => {
    const ws = new WebSocket(
      `wss://smartminds.eoi.group/ws/chat/realtime/?token=${jwtToken}`
    );

    const chunks: string[] = [];
    let timeoutId: NodeJS.Timeout;

    const cleanup = () => {
      clearTimeout(timeoutId);
      ws.close();
    };

    // Set a timeout for the entire operation
    timeoutId = setTimeout(() => {
      cleanup();
      resolve(
        new Response(
          JSON.stringify({
            error: "Request timed out",
          }),
          { status: 504 }
        )
      );
    }, 30000);

    ws.onopen = () => {
      const message = {
        persona_id: "5",
        format: format,
        ...(text && { text }),
        ...(audio && { audio }),
        metadata: {
          key: "value",
        },
      };

      ws.send(JSON.stringify(message));
    };

    ws.onmessage = (event: any) => {
      const data = event.data;
      try {
        const response = JSON.parse(data.toString());

        if (response.audio) {
          chunks.push(response.audio);
        }
        if (response.message === "final") {
          cleanup();
          resolve(
            new Response(
              JSON.stringify({
                audioChunks: chunks,
              })
            )
          );
        }
      } catch (error) {
        cleanup();
        resolve(
          new Response(
            JSON.stringify({
              error: "Invalid response format",
            }),
            { status: 500 }
          )
        );
      }
    };

    ws.onerror = (error: any) => {
      console.error("WebSocket error:", error);
      cleanup();
      resolve(
        new Response(
          JSON.stringify({
            error: "Connection error",
          }),
          { status: 500 }
        )
      );
    };
  });
}
