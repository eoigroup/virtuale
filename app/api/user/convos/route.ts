import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "@/types/user";
import { PERSONA_ACTIONS } from "@/lib/actions";

export async function POST(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt")?.value;

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

  try {
    const jwt = jwtDecode<DecodedJWT>(jwtToken);
    const body: BodyInit = new FormData();
    body.append("unique_id", jwt.unique_id);
    body.append("action", PERSONA_ACTIONS.GET_USER_CONVOS);

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

    const response = await fetch(`${API_URL}/api/user`, requestOptions);

    if (!response.ok) {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        throw new Error(data.error || data?.reply || data?.data?.reply);
      } else {
        throw new Error(response.statusText);
      }
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
