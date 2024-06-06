import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  // Find the user by username and password
  const user = await prisma.user.findFirst({
    where: {
      username: username,
      password_key: password,
    },
  });

  if (user) {
    // Successful login
    return NextResponse.json({ success: true });
  } else {
    // Invalid credentials
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
