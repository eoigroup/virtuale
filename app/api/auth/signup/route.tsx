import { API_URL } from "@/lib/config";
import { MEMBER_SHIP } from "@/lib/membership";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const response = await fetch(`${API_URL}/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body?.name,
        username: body?.name,
        creator_first_name: body?.name,
        email: body?.email,
        password: body?.password,
        virtuale_member_type: MEMBER_SHIP.FREE,
      }),
    });

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
