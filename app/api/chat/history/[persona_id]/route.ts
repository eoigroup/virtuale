import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "@/types/user";
import { PERSONA_ACTIONS } from "@/lib/actions";

export async function GET(
  req: NextRequest,
  params: {
    params: { persona_id: string };
  }
) {
  const jwtToken = req.cookies.get("jwt")?.value;
  const persona_id = params.params.persona_id;

  if (!jwtToken) {
    return Response.json(
      { message: "You are not authenticated" },
      { status: 400 }
    );
  }

  if (!AGENT_API_KEY) {
    return Response.json(
      { message: "AGENT_API_KEY is missing" },
      { status: 400 }
    );
  }

  if (!AGENT_AUTHOR) {
    return Response.json(
      { message: "AGENT_AUTHOR is missing" },
      { status: 400 }
    );
  }

  if (!persona_id) {
    return Response.json({ message: "persona_id is missing" }, { status: 400 });
  }

  try {
    const jwt = jwtDecode<DecodedJWT>(jwtToken);

    const body: BodyInit = new FormData();
    body.append("unique_id", jwt.unique_id);
    body.append("action", PERSONA_ACTIONS.GET_USER_MESSAGES);
    body.append("persona_id", String(persona_id));

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${AGENT_API_KEY}`,
        author: AGENT_AUTHOR,
        Cookie: `jwt=${jwtToken};`,
        ContentType: "multipart/form-data",
      },
      body: body,
      redirect: "follow",
    };

    const response = await fetch(`${API_URL}/api/v2/user`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data?.data?.reply);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
