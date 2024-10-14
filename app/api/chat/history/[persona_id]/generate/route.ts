import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "@/types/user";

export async function POST(
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
  const { msg, type, encoding, response_format } = await req.json();

  if (!msg) {
    return Response.json({ message: "msg is missing" }, { status: 400 });
  }

  if (!type) {
    return Response.json({ message: "type is missing" }, { status: 400 });
  }

  if (!encoding) {
    return Response.json({ message: "encoding is missing" }, { status: 400 });
  }

  try {
    const jwt = jwtDecode<DecodedJWT>(jwtToken);

    const body: BodyInit = new FormData();
    body.append("unique_id", jwt.unique_id);
    body.append("persona_id", String(persona_id));
    body.append("msg", msg);
    body.append("type", type);
    body.append("encoding", encoding);
    if (response_format) {
      body.append("response_format", response_format);
    }

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

    const response = await fetch(`${API_URL}/api/chat`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data?.reply || data?.data?.reply);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
