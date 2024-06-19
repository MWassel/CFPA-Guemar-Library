import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const books = await prisma.book.findMany({
    where: {
      book_title: {
        contains: query,
      },
    },
    include: {
      Author: true,
    },
  });
  return NextResponse.json(books, { status: 200 });
}

/*
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const books = await prisma.book.findMany({
    where: {
      book_title: {
        contains: query,
      },
    },
  });
  const bookTitles = books.map((book) => book.book_title);
  return NextResponse.json(bookTitles, { status: 200 });
}*/

/*
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const books = await prisma.book.findMany({
    where: {
      book_title: {
        contains: query,
      },
    },
  });

  console.log(books);
  return NextResponse.json(books);
}*/
