import { API_URL } from "@/lib/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt")?.value;

  if (!jwtToken) {
    return Response.json(
      { message: "You are not authenticated" },
      { status: 400 }
    );
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Cookie: `jwt=${jwtToken};`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(`${API_URL}/auth/logout/`, requestOptions);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || data?.reply || data?.data?.reply);
    }

    cookies().delete("jwt");

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
