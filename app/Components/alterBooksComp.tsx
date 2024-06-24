"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AlterBooksComp() {
  const router = useRouter();

  const [books, setBooks] = useState([]);

  const getBookList = async () => {
    const response = await fetch("/api/fetchBooks");
    const data = await response.json();
    setBooks(data);
  };

  const deleteBook = async (id) => {
    const response = await fetch(`/api/deleteBook?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    // if (result.success) { // dosnt return a success message
    //   alert("Book deleted successfully");
    // } else {
    //   alert("Book deletion failed");
    // }
    getBookList();
  };

  const handleEditClick = (id) => {
    router.push(`/EditBook/${id}`);
  };

  useEffect(() => {
    getBookList();
  }, []);
  return (
    <>
      <div className=" flex flex-col col-span-1 bg-darkBlueCard w-full h-full text-white">
        {books.map((book) => (
          <ul key={book.book_id}>
            <li>
              {book.book_title} by {book.Author.author_name}
              <div className="flex flex-row gap-2">
                <button
                  className=" text-green-600"
                  onClick={() => handleEditClick(book.book_id)}
                >
                  تعديل
                </button>
                <button
                  className=" text-red-600"
                  onClick={() => deleteBook(book.book_id)}
                >
                  حذف
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
