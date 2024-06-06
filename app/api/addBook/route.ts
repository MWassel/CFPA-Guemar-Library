import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const authorId = data.get("authorId") as string;
  const bookTitle = data.get("bookTitle") as string;
  const publishingYear = data.get("PublishingYear") as string;
  const pagesNumber = data.get("PagesNumber") as string;
  const publishingHouse = data.get("PublishingHouse") as string;
  const aboutBook = data.get("AboutBook") as string;
  const category = data.get("Category") as string;
  const copysNumber = data.get("CopysNumber") as string;

  const file = data.get("bookCover") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "public/uploads/book_covers", file.name);
  await writeFile(path, buffer);

  const book = await prisma.book.create({
    data: {
      author_id: parseInt(authorId),
      book_title: bookTitle,
      publishing_year: publishingYear ? parseInt(publishingYear) : null,
      pages_number: pagesNumber ? parseInt(pagesNumber) : null,
      publishing_house: publishingHouse,
      about_book: aboutBook,
      category: category,
      copys_number: copysNumber ? parseInt(copysNumber) : null,
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
