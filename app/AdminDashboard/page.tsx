"use client";
import AddAuthorComp from "../Components/addAuthorComp";
import AddBookComp from "../Components/addBookComp";
import ManualBookLandingComp from "../Components/manualBookLandingComp";
import AddBookCopyComp from "../Components/addBookCopyComp";

export default function AdminDashboard() {
  return (
    <>
      <AddAuthorComp />
      <AddBookComp />
      <AddBookCopyComp />
      <ManualBookLandingComp />
    </>
  );
}
