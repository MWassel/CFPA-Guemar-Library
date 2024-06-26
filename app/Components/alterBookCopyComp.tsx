"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AlterBookCopyComp() {
  const router = useRouter();

  const [bookcopys, setBookCopys] = useState([]);

  const getBookCopysList = async () => {
    const response = await fetch("/api/fetchBookCopys");
    const data = await response.json();
    setBookCopys(data);
  };

  const deleteBookCopy = async (id) => {
    const response = await fetch(`/api/deleteBookCopy?id=${id}`, {
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
    getBookCopysList();
  };

  const handleEditClick = (id) => {
    router.push(`/EditBookCopy/${id}`);
  };

  useEffect(() => {
    getBookCopysList();
  }, []);
  return (
    <>
      <div className=" h-full w-full rounded-3xl bg-darkBlueCard text-white shadow-md p-4 items-center">
        <p className=" text-center font-bold text-2xl mt-4 mb-8 ">نسخ الكتب</p>
        {bookcopys.map((bookcopy) => (
          <ul key={bookcopy.copy_id}>
            <li>
              <div className="flex flex-row gap-2">
                رقم النسخة : {bookcopy.copy_id} - معرف الكتاب :{" "}
                {bookcopy.book_id}
                {/* <button
                  className=" text-green-600"
                  onClick={() => handleEditClick(bookcopy.copy_id)}
                >
                  تعديل
                </button> */}
                <button
                  className=" text-red-600"
                  onClick={() => deleteBookCopy(bookcopy.copy_id)}
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
