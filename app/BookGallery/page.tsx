"use client";
import React from "react";
import BookSearchComp from "../Components/bookSearchComp";

export default function page() {
  return (
    <>
      <div className=" bg-black">
        <div className=" flex w-screen h-screen justify-center items-center">
          <BookSearchComp hight={"screen"} width={"screen"} />
        </div>
      </div>
    </>
  );
}
