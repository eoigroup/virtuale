import { API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const response = await fetch(`${API_URL}/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        is_creator: "true",
      },
      body: JSON.stringify({
        name: body?.name,
        username: body?.name,
        creator_first_name: body?.name,
        email: body?.email,
        password: body?.password,
        is_creator: body?.is_creator,
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
