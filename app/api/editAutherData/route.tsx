import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const autherId = url.searchParams.get("id");
  const data = await req.formData();

  if (!autherId)
    return NextResponse.json({ error: "Invalid auther ID" }, { status: 400 });

  const authorName = data.get("authorName") as string;
  const authorNationality = data.get("authorNationality") as string;
  const authorBirthdate = data.get("authorBirthdate") as string;
  const authorField = data.get("authorField") as string;
  console.log(autherId, authorName, authorNationality, authorBirthdate);

  const author = await prisma.author.update({
    where: {
      author_id: Number(autherId),
    },
    data: {
      author_name: authorName,
      author_nationality: authorNationality,
      author_birthdate: new Date(authorBirthdate),
      author_field: authorField,
    },
  });
  if (author) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
