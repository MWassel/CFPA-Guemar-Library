import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const landingId = data.get("landingId") as string;
  const actualReturnDate = data.get("actualReturnDate") as string;

  const book = await prisma.lending.update({
    where: {
      lending_id: parseInt(landingId),
    },
    data: {
      actual_return_date: new Date(actualReturnDate),
      return_status: "Returned",
    },
  });

  return NextResponse.json({ success: true });
}
