import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const copyId = data.get("copyId") as string;
  const userId = data.get("userId") as string;
  const returnDate = data.get("returnDate") as string;
  const manualLanding = await prisma.Lending.create({
    data: {
      copy_id: parseInt(copyId),
      user_id: userId,
      return_date: new Date(returnDate),
    },
  });

  if (manualLanding) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
