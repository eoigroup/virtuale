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
    const { email, otp } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Missing email request body" },
        { status: 400 }
      );
    }

    if (!otp) {
      return NextResponse.json(
        { error: "Missing otp request body" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/auth/verify-change/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwtToken};`,
      },
      body: JSON.stringify({
        new_email: email,
        otp: otp,
      }),
    });

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