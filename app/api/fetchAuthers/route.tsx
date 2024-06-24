import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const authers = await prisma.author.findMany();
  return NextResponse.json(authers, { status: 200 });
}
