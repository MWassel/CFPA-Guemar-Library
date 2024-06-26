import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const booksLended = await prisma.lending.findMany({
    include: {
      //Book: true,
      User: true,
    },
  });
  return NextResponse.json(booksLended, { status: 200 });
}
