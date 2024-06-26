"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ControlPanel() {
  const [users, setUsers] = useState<any>([]);

  const getUserList = async () => {
    const response = await fetch("/api/fetchUsers");
    const data = await response.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const response = await fetch(`/api/deleteUser?id=${id}`, {
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
    getUserList();
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <>
      <div className=" container mx-auto">
        <div className=" h-screen w-full rounded-3xl bg-darkBlueCard text-white shadow-md p-4 items-center mt-12">
          <h1 className=" text-center font-bold text-2xl mt-4 mb-8 ">
            المستخدمين
          </h1>
          {users.map((user) => (
            <ul key={user.user_id}>
              <li>
                <div className="flex flex-row ml-6 mt-6 border-b-2 border-zinc-400 ">
                  <div className="flex flex-row gap-2 ">
                    <Image
                      className="rounded-full mb-4 border-2"
                      src={"/" + user.profile_picture}
                      width={80}
                      height={80}
                      alt={user.fullname}
                    />
                    <div className=" flex justify-center text-center font-bold items-center ml-2">
                      {user.fullname} - {user.specialization}
                    </div>
                    <button
                      className=" text-red-600"
                      onClick={() => deleteUser(user.user_id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
