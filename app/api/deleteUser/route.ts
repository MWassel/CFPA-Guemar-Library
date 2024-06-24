import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const user = await prisma.user.delete({
    where: {
      user_id: id,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
