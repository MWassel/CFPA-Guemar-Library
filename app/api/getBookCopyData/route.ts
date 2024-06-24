import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const bookCopyId = url.searchParams.get("id") as string;
  console.log(bookCopyId);
  if (!bookCopyId)
    return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
  const bookCopy = await prisma.book_copy.findUnique({
    where: {
      copy_id: parseInt(bookCopyId),
    },
  });
  if (!bookCopy)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  return NextResponse.json(bookCopy);
}
