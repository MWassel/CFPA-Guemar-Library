import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const autherId = url.searchParams.get("id");
  if (!autherId)
    return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
  const Auther = await prisma.author.findUnique({
    where: {
      author_id: Number(autherId),
    },
  });
  if (!Auther)
    return NextResponse.json({ error: "Auther not found" }, { status: 404 });
  return NextResponse.json(Auther);
}
