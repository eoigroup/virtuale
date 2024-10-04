import { API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { otp, email } = body;
    if (!otp) {
      return NextResponse.json(
        { error: "Missing otp request body" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Missing email request body" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/auth/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        is_creator: "true",
      },
      body: JSON.stringify({
        email,
        otp,
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
