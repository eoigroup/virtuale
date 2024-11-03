import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "@/types/user";

export async function POST(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt")?.value;

  if (!jwtToken) {
    return Response.json(
      { message: "You are not authenticated" },
      { status: 400 }
    );
  }

  try {
    const { sub_id } = await req.json();
    const jwt = jwtDecode<DecodedJWT>(jwtToken);
    
    const body = new FormData();
    body.append("unique_id", jwt.unique_id);
    body.append("action", "subscribe");
    body.append("sub_id", sub_id);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${AGENT_API_KEY}`,
        author: AGENT_AUTHOR,
        Cookie: `jwt=${jwtToken};`,
      },
      body: body,
    };

    const response = await fetch(
      `${API_URL}/api/v2/virtual-pay`,
      requestOptions
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create subscription");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
} 