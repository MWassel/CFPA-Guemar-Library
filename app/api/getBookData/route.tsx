import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const bookId = url.searchParams.get("id");
  if (!bookId)
    return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
  const book = await prisma.book.findUnique({
    where: {
      book_id: bookId,
    },
  });
  if (!book)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  return NextResponse.json(book);
}
