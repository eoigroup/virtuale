import { API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "@/types/user";
import { PERSONA_ACTIONS } from "@/lib/actions";

const agentAuthor = process.env.AGENT_AUTHOR || "";
const agentApiKey = process.env.AGENT_API_KEY || "";

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

  if (!agentApiKey) {
    return Response.json(
      { message: "AGENT_API_KEY is missing" },
      { status: 400 }
    );
  }

  if (!agentAuthor) {
    return Response.json(
      { message: "AGENT_AUTHOR is missing" },
      { status: 400 }
    );
  }

  if (!persona_id) {
    return Response.json({ message: "persona_id is missing" }, { status: 400 });
  }
  const { msg, type, encoding } = await req.json();

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

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${agentApiKey}`,
        author: agentAuthor,
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
