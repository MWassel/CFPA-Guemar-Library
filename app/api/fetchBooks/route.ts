import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const books = await prisma.book.findMany({
    include: {
      Author: true,
    },
  });
  return NextResponse.json(books);
}
