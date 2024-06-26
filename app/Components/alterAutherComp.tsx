"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Author {
  author_id: number;
  author_name: string;
  author_nationality: string;
}

export default function AlterAutherComp() {
  const router = useRouter();

  const [authers, setAuthers] = useState<Author[]>([]);

  const getAuthersList = async () => {
    const response = await fetch("/api/fetchAuthers");
    const data = await response.json();
    setAuthers(data);
  };

  const deleteAuther = async (id) => {
    const response = await fetch(`/api/deleteAuther?id=${id}`, {
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
    getAuthersList();
  };

  const handleEditClick = (id) => {
    router.push(`/EditAuther/${id}`);
  };

  useEffect(() => {
    getAuthersList();
  }, []);
  return (
    <>
      <div className=" h-full w-full rounded-3xl bg-darkBlueCard text-white shadow-md p-4 items-center">
        <p className=" text-center font-bold text-2xl mt-4 mb-8 ">المؤلفين</p>
        {authers.map((authers) => (
          <ul key={authers.author_id}>
            <li>
              <div className="flex flex-row gap-2">
                {authers.author_name} - {authers.author_nationality}
                <button
                  className=" text-green-600"
                  onClick={() => handleEditClick(authers.author_id)}
                >
                  تعديل
                </button>
                <button
                  className=" text-red-600"
                  onClick={() => deleteAuther(authers.author_id)}
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
