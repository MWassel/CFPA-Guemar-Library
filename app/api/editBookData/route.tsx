import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const bookId = url.searchParams.get("id");
  const data = await req.formData();
  const bookIdd = data.get("bookId") as string;
  const authorId = data.get("authorId") as string;
  const bookTitle = data.get("bookTitle") as string;
  const PublishingYear = data.get("PublishingYear") as string;
  const PagesNumber = data.get("PagesNumber") as string;
  const publishingHouse = data.get("PublishingHouse") as string;
  const AboutBook = data.get("AboutBook") as string;
  const category = data.get("Category") as string;
  const CopysNumber = data.get("CopysNumber") as string;

  const file = data.get("bookCover") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "public/uploads/book_covers", file.name);
  await writeFile(path, buffer);

  const imageUrl = `uploads/book_covers/${file.name}`;

  const book = await prisma.book.update({
    where: {
      book_id: bookId,
    },
    data: {
      book_id: bookIdd,
      author_id: parseInt(authorId),
      book_title: bookTitle,
      publishing_year: PublishingYear ? parseInt(PublishingYear) : null,
      pages_number: PagesNumber ? parseInt(PagesNumber) : null,
      publishing_house: publishingHouse,
      about_book: AboutBook,
      category: category,
      copys_number: CopysNumber ? parseInt(CopysNumber) : null,
      book_cover: imageUrl,
    },
  });
  if (book) {
    // Successful login
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
