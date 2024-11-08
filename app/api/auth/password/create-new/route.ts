import { API_URL } from "@/lib/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Missing email request body" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Missing password request body" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/auth/create-new-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `_reset_password=${req.cookies.get("_reset_password")?.value}`,
      },
      body: JSON.stringify({
        email,
        new_password: password,
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
    cookies().delete("_reset_password");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
