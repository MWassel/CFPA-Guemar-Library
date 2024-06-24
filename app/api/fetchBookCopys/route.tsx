import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const bookcopys = await prisma.book_copy.findMany();
  return NextResponse.json(bookcopys, { status: 200 });
}
