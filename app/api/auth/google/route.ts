import { API_URL } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

const agentAuthor = process.env.AGENT_AUTHOR || "";
const agentApiKey = process.env.AGENT_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/auth/google/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${agentApiKey}`,
        author: agentAuthor,
      },
    });

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
