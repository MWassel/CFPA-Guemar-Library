import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const bookId = data.get("bookId") as string;
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

  console.log(
    bookId,
    authorId,
    bookTitle,
    PublishingYear,
    PagesNumber,
    publishingHouse,
    AboutBook,
    category,
    CopysNumber,
    path
  );

  const book = await prisma.book.create({
    data: {
      book_id: bookId,
      author_id: parseInt(authorId),
      book_title: bookTitle,
      publishing_year: PublishingYear ? parseInt(PublishingYear) : null,
      pages_number: PagesNumber ? parseInt(PagesNumber) : null,
      publishing_house: publishingHouse,
      about_book: AboutBook,
      category: category,
      copys_number: CopysNumber ? parseInt(CopysNumber) : null,
      book_cover: path,
    },
  });
  if (book) {
    // Successful login
    return NextResponse.json({ success: true });
  } else {
    // Invalid credentials
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}

/*
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { writeFile } from "fs/promises";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const authorId = data.get("authorId") as string;
  const bookTitle = data.get("bookTitle") as string;
  const publishingYear = data.get("bookPublishingYear") as string;
  const pagesNumber = data.get("bookPagesNumber") as string;
  const publishingHouse = data.get("bookPublishingHouse") as string;
  const aboutBook = data.get("bookAboutBook") as string;
  const category = data.get("bookCategory") as string;
  const copysNumber = data.get("bookCopysNumber") as string;

  const File = data.get("bookCover") as File;
  const bytes = await File.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "public/uploads/book_covers", File.name);
  await writeFile(path, buffer);

  const book = await prisma.book.create({
    data: {
      author_id: parseInt(authorId),
      book_title: bookTitle,
      publishing_year: parseInt(publishingYear),
      pages_number: parseInt(pagesNumber),
      publishing_house: publishingHouse,
      about_book: aboutBook,
      category: category,
      copys_number: parseInt(copysNumber),
      book_cover: path,
    },
  });
  if (book) {
    // Successful login
    return NextResponse.json({ success: true });
  } else {
    // Invalid credentials
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}*/
