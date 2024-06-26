"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type returnBook = {
  actualReturnDate: Date;
};

export default function ReturnBookComp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<returnBook>();
  const [errorMessage, setErrorMessage] = useState("");
  const [booksLanded, setBooksLanded] = useState([]);

  // Fetch the books that have been landed
  const fetchBooksLanded = async () => {
    const response = await fetch("/api/fetchBooksLanded");
    const data = await response.json();
    setBooksLanded(data);
  };

  // Higher-order function to handle submission with additional arguments
  const handleFormSubmit = (landingId: number) => {
    return handleSubmit(async (data) => {
      const formData = new FormData();
      const actualReturnDate = new Date(data.actualReturnDate);
      formData.append("actualReturnDate", actualReturnDate.toISOString());
      formData.append("landingId", landingId.toString());
      const response = await fetch("/api/returnBook", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setErrorMessage("");
        fetchBooksLanded();
      } else {
        setErrorMessage(result.message);
      }
    });
  };

  useEffect(() => {
    fetchBooksLanded();
  }, []);

  return (
    <div className="h-full w-full rounded-3xl bg-darkBlueCard text-white shadow-md p-4 items-center">
      <p className="text-center font-bold text-2xl mt-2 mb-8">السجل</p>
      {booksLanded.map((bookLand) => (
        <ul
          className="text-center font-bold text-xl mt-4 mb-8 border-b-2"
          key={bookLand.lending_id}
        >
          <li>إستعار الطالب: {bookLand.User.fullname}</li>
          <li>رقم النسخة: {bookLand.copy_id}</li>
          <li>تاريخ الاعارة: {bookLand.lending_start_date}</li>
          <li>تاريخ العودة: {bookLand.return_date}</li>
          {bookLand.actual_return_date != null && (
            <li>تاريخ الارجاع: {bookLand.actual_return_date}</li>
          )}
          <li
            className={`mb-4 ${
              bookLand.return_status === "Returned"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            الحالة: {bookLand.return_status}
          </li>
          <li>
            {bookLand.actual_return_date == null && (
              <form onSubmit={handleFormSubmit(bookLand.lending_id)}>
                <div className="flex flex-col justify-between items-center m-8">
                  <input
                    className="w-full h-10 rounded-full px-4 py-2 mb-2 focus:outline-none focus:ring-1 bg-white text-black text-center "
                    type="date"
                    {...register("actualReturnDate", { required: true })}
                  />
                  {errors.actualReturnDate && <span>هذا الحقل مطلوب</span>}
                  <button
                    className=" w-full h-10 text-center rounded-full px-4 py-2 text-white bg-orangeCard mb-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    ارجاع
                  </button>
                </div>
              </form>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
}
