import { API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt")?.value;

  if (!jwtToken) {
    return Response.json(
      { message: "You are not authenticated" },
      { status: 400 }
    );
  }

  const body = await req.json();
  try {
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Missing email request body" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/auth/change-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwtToken};`,
      },
      body: JSON.stringify({
        new_email: email,
      }),
    });

    const data = await response.json();
    console.log("data", data);
    if (!response.ok) {
      throw new Error(data.error || data?.detail);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}