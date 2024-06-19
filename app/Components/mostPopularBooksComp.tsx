"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MostPopularBooksComp() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/fetchBooks");
      const data = await response.json();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  return (
    <div className=" w-full h-44 flex-wrap flex-grow flex flex-col">
      <div className="flex flex-wrap flex-grow justify-end mt-2  ">
        {books.map((book) => (
          <div
            key={book.id}
            className=" w-44 h-52 flex flex-col items-center justify-center mt-6 mr-2 "
          >
            <Image
              src={"/" + book.book_cover}
              width={120}
              height={120}
              alt={book.book_title}
            />
            <h3 className="text-white font-bold mt-2 text-sm">
              {book.book_title}
            </h3>
            <p className=" text-white text-xs">{book.Author.author_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
