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
        <div className=" flex flex-col col-span-1 bg-darkBlueCard w-full h-full text-white mt-20">
          {users.map((user) => (
            <ul key={user.user_id}>
              <li>
                <div className="flex flex-row ml-6 mt-6">
                  <Image
                    className="rounded-full mb-4"
                    src={"/" + user.profile_picture}
                    width={100}
                    height={100}
                    alt={user.fullname}
                  />
                  {user.fullname} - {user.specialization}
                  <div className="flex flex-row gap-2">
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
