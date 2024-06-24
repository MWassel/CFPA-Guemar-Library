import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const book = await prisma.book.delete({
    where: {
      book_id: id,
    },
  });
  return NextResponse.json(book, { status: 200 });
}
