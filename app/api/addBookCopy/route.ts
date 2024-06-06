import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const copyId = data.get("copyId") as string;
  const bookId = data.get("bookId") as string;

  const bookCopy = await prisma.book_copy.create({
    data: {
      copy_id: parseInt(copyId),
      book_id: parseInt(bookId),
    },
  });
  return NextResponse.json({ success: true });
}
