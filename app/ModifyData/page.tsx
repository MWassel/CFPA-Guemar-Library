import React from "react";
import AlterBooksComp from "../Components/alterBooksComp";
import AlterAutherComp from "../Components/alterAutherComp";
import AlterBookCopyComp from "../Components/alterBookCopyComp";
export default function ModifyData() {
  return (
    <>
      <div className="container mx-auto">
        <div className=" grid grid-cols-3 sm:grid-cols-3 m-10 mt-28 gap-4">
          <AlterBookCopyComp />
          <AlterBooksComp />
          <AlterAutherComp />
        </div>
      </div>
    </>
  );
}
