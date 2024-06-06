import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const authorName = data.get("authorName") as string;
  const authorNationality = data.get("authorNationality") as string;
  const authorBirthdate = data.get("authorBirthdate") as string;
  const authorField = data.get("authorField") as string;
  const author = await prisma.author.create({
    data: {
      author_name: authorName,
      author_nationality: authorNationality,
      author_birthdate: new Date(authorBirthdate),
      author_field: authorField,
    },
  });

  if (author) {
    // Successful login
    return NextResponse.json({ success: true });
  } else {
    // Invalid credentials
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
