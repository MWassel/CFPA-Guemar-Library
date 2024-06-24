import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const bookCopyId = url.searchParams.get("id");
  const data = await req.formData();

  if (!bookCopyId)
    return NextResponse.json({ error: "Invalid auther ID" }, { status: 400 });

  const copyId = data.get("copyId") as string;
  const bookId = data.get("bookId") as string;

  const bookCopy = await prisma.book_copy.update({
    where: {
      copy_id: parseInt(bookCopyId),
    },
    data: {
      copy_id: parseInt(copyId),
      book_id: bookId,
    },
  });
  if (bookCopy) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
