import { auth } from "@/utils/firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { NextResponse } from "next/server";

function setSessionCookie(idToken: string): NextResponse {
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
  );

  response.cookies.set("session", idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}

export async function login(formData: FormData) {
  const { toast } = useToast();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    return setSessionCookie(idToken);
  } catch (error: any) {
    toast({
      title: "Login Failed",
      description: error.message,
      variant: "destructive",
    });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function signup(formData: FormData): Promise<NextResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);

    const idToken = await userCredential.user.getIdToken();

    return setSessionCookie(idToken);
  } catch (error: any) {
    console.error("Signup failed:", error);
    const signupUrl = new URL(
      "/auth",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    );
    signupUrl.searchParams.set("error", error.message);
    return NextResponse.redirect(signupUrl);
  }
}
