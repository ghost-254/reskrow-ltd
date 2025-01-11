import { adminAuth } from "@/utils/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token missing" },
        { status: 400 }
      );
    }

    await adminAuth.verifySessionCookie(token, true);

    return NextResponse.json({ valid: true });
  } catch (error: any) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { valid: false, error: error.message },
      { status: 401 }
    );
  }
}
