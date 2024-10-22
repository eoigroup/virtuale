import { API_URL } from "@/lib/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const response = await fetch(`${API_URL}/auth/verify-password-reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
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

    const responseCookies = response?.headers?.get("Set-Cookie");
    if (responseCookies) {
      const resetPasswordCookie = responseCookies.split(";")[0].split("=")[1];
      cookies().set("_reset_password", resetPasswordCookie);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
