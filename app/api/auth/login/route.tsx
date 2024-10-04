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

    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });

    const data = await response.json();
    const respCookies = response.headers.get("set-cookie");

    if (!respCookies) {
      NextResponse.json(data, { status: 400 });
    }

    if (respCookies) {
      const jwtToken = respCookies.split(";")[0].split("=")[1];
      cookies().set("jwt", jwtToken);
    }

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
