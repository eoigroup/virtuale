import { USER_ACTIONS } from "@/lib/actions";
import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { DecodedJWT } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  try {
    const decodedJwt = jwtDecode<DecodedJWT>(token);

    const body: BodyInit = new FormData();
    body.append("unique_id", decodedJwt.unique_id);
    body.append("action", USER_ACTIONS.GET_USER);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${AGENT_API_KEY}`,
        author: AGENT_AUTHOR,
        Cookie: `jwt=${token};`,
        ContentType: "multipart/form-data",
      },
      body: body,
      redirect: "follow",
    };

    const response = await fetch(`${API_URL}/api/v2/user`, requestOptions);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
