import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const author = await prisma.Author.delete({
    where: {
      author_id: Number(id),
    },
  });
  return NextResponse.json(author, { status: 200 });
}
