import React from "react";
import AddAuthorComp from "../Components/addAuthorComp";
import AddBookComp from "../Components/addBookComp";
import AddBookCopyComp from "../Components/addBookCopyComp";

export default function AddData() {
  return (
    <div className="container mx-auto w-full h-full">
      <div className=" grid grid-cols-3 sm:grid-cols-3 gap-8 h-full w-full mt-12">
        <AddBookCopyComp />
        <AddBookComp />
        <AddAuthorComp />
      </div>
    </div>
  );
}
